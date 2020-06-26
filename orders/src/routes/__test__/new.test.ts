import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/orders for post request', async () => {
  const response = await request(app).post('/api/orders').send({});
  expect(response.status).not.toEqual(404);
});

// Is authenticated
it('can only be accessed by signed-in user', async () => {
  await request(app).post('/api/orders').send({}).expect(401);
});

it('can be accessed by signed-in user', async () => {
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns a 404 if the provided ticket id does ont exist', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put('/api/orders/')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date(),
  });

  await ticket.save();

  const order = Order.build({
    ticket,
    userId: 'blahblahblah',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('reserves a ticket successfully', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date(),
  });

  await ticket.save();


  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it('emits an order created event', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date(),
  });

  await ticket.save();


  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

});