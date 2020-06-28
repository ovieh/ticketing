import { Listener, OrderCreatedEvent, Subjects } from '@ojticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName=  queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {

        const order = Order.build({
            id: data.id,
            status: data.status,
            price: data.ticket.price,
            userId: data.userId,
            version: data.version,
            userEmail: data.userEmail,
        });

        await order.save();

        msg.ack();
    }
}
