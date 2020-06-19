import { TicketedUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedEvent } from '@ojticketing/common';

const setup = async () => {
  // creates an instance of the listener
  const listener = new TicketedUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  // create a fake data object

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    price: 500,
    title: 'New Concert',
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
  };
  // crate a fake message object
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack was called
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if event is out of sync', async () => {
  const { listener, data, msg } = await setup();

  data.version = 100;

  // call the onMessage function with the data object + message object
  try {
    await listener.onMessage(data, msg);
  } catch {
    console.log('nothing');
  }

  // write assertions to make sure ack was called
  expect(msg.ack).not.toHaveBeenCalled();
});
