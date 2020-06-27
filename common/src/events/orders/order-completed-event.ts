import { Subjects } from '../subjects';

export interface OrderCompletedEvent {
    subject: Subjects.OrderCompleted;
    data: {
        id: string;
        ticket: {
            id: string;
            title: string;
            price: number;
            date: Date;
        }
    }
}