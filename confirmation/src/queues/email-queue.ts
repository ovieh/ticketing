import Queue from 'bull';
import SendGrid from '../sendgrid';
interface Payload {
  title: string;
  date: Date;
  price: number;
  email: string;
}

console.log(process.env.REDIS_HOST);

const emailQueue = new Queue<Payload>('order:complete', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});
emailQueue.process(async (job) => {
  try {
    console.log(job.data);
    const sendGrid = new SendGrid(
      job.data.email,
      'Order Successfully Placed'
    );

    sendGrid.sendMail();
  } catch (error) {
    console.log(error);
  }
});

export { emailQueue };
