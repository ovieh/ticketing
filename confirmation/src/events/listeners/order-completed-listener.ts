import {Listener, OrderCompletedEvent, Subjects } from '@ojticketing/common';
import { Message } from 'node-nats-streaming';
import { emailQueue } from '../../queues/email-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
    subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
    queueGroupName = queueGroupName;
    async onMessage(
        data: OrderCompletedEvent['data'],
        msg: Message,
    ): Promise<void> {
        
        await emailQueue.add(
            {
                date: data.ticket.date,
                email: data.email,
                price: data.ticket.price,
                title: data.ticket.title
            }
        );

        msg.ack();
    }
}