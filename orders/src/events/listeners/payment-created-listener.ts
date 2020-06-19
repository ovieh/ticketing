import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
} from '@ojticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(
    data: PaymentCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Order('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    // TODO: Create order updated event type order:updated

    await order.save();

    msg.ack();
  }
}
