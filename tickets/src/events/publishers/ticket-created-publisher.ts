import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@ojticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
