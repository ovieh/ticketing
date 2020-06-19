import { OrderCreatedEvent, Listener, Subjects } from '@ojticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    // Find the ticket tht the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    // Mark the ticket as being reserved by setting the orderId prop
    ticket.set({ orderId: data.id });
    //Save the ticket
    await ticket.save();

    // Send Updated ticket event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId
    });
    // ack the message
    msg.ack();
  }
}
