import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
} from '@ojticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message, Stan } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { OrderCompletedPublisher } from '../publishers/order-completed-publisher';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  protected user: any;
  constructor(client: Stan,
    // user: any
    ) {
    super(client);
    // this.user = user;
  }

  async onMessage(
    data: PaymentCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    // TODO: Create order updated event type order:updated

    await order.save();

    await new OrderCompletedPublisher(this.client).publish({
      id: order.id,
      ticket: order.ticket,
      email: order.userEmail,
    });

    msg.ack();
  }
}
