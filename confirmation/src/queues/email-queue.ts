import Queue from 'bull';
import SendGrid from '../sendgrid';
import { TicketPayload } from '../types';

const emailQueue = new Queue<TicketPayload>('order:complete', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});
const url =
  process.env.NODE_ENV === 'development'
    ? 'https://ticketing.dev/orders'
    : 'https://www.ticketing-prod.xyz/orders';

emailQueue.process(async (job) => {
  try {
    const sendGrid = new SendGrid('Order Successfully Placed', job.data, url);

    sendGrid.sendMail();
  } catch (error) {
    console.log(error);
  }
});

export { emailQueue };
