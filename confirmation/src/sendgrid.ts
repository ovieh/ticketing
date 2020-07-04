import sgMail from '@sendgrid/mail';
import { TicketPayload } from './types';

export default class SendGrid {
  private from: string;
  protected to: string;
  protected subject: string;
  protected title: string;
  protected date: Date;
  protected orderUrl: string;


  constructor(subject: string, ticket: TicketPayload, orderUrl: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.from = 'omokoro@gmail.com';
    this.to = ticket.email;
    this.subject = subject;
    this.title = ticket.title;
    this.date = ticket.date;
    this.orderUrl = orderUrl;
  }
  async sendMail(): Promise<void> {

    const msg = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: 'This is a test of this module',
      html: 
      `
        <h3>Thanks for purchasing your ticket with us!!</h3>
        <h4>Ticket Information</h4>
        <p>${this.title}</p>
        <p>Performace date: ${this.date}</p>
        <a href="${this.orderUrl}">View your ticket</a>
      `,
    };
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body);
        }
      }
  }
}
