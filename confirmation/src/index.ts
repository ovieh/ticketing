import { natsWrapper } from './nats-wrapper';
import { OrderCompletedListener } from './events/listeners/order-completed-listener';
const start = async () => {
  console.log('Starting up 🚀');

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined!');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined!');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined!');
  }

  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined!');
  }

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY must be defined!');
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    // Initiate listeners
    new OrderCompletedListener(natsWrapper.client).listen();
  
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }
};

start();
