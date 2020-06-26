import { Listener, TicketCreatedEvent, Subjects } from '@ojticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = queueGroupName;

  async onMessage(
    data: TicketCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const { id, title, price, date } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
      date,
    });

    await ticket.save();

    msg.ack();
  }
}
