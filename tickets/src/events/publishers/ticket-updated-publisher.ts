import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
  } from '@ojticketing/common';
  
  export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
      subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  }
  