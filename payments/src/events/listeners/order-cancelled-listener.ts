import { Listener, OrderCancelledEvent, Subjects, OrderStatus } from '@ojticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName=  queueGroupName;

    async  onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {

        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1
        });

        if (!order) {
            throw new Error('Order does not exist');
        }

        order.set({ status: OrderStatus.Cancelled, userEmail: null });
        await order.save();

        msg.ack();
    }
}
