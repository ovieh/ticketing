import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { ExpirationCompleteEvent, OrderStatus } from '@ojticketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';

const setup = async () => {
  // creates an instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  // create a fake data object

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date()
  });
  await ticket.save();

  const order = Order.build({
    expiresAt: new Date(),
    userId: 'blah',
    status: OrderStatus.Created,
    ticket,
  });

  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };
  // create a fake message object
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order, ticket };
};

it('updates the status of a order to cancelled', async () => {
  const { listener, data, msg, order } = await setup();
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);


});

it('Emits an order cancelled event', async () => {
    const { listener, data, msg, order, } = await setup();
  
    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(eventData.id).toEqual(order.id);
  
  });

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack was called
  expect(msg.ack).toHaveBeenCalled();
});
