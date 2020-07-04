import { Publisher, OrderCompletedEvent, Subjects } from '@ojticketing/common';

export class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
}
