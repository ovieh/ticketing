import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@ojticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
