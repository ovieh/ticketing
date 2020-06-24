import { Subjects } from '../subjects';

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        date: Date;
        userId: string;
        version: number;
    }
}