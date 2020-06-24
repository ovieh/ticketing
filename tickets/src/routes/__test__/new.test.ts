import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed by signed-in user', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('can be accessed by signed-in user', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
      date: new Date()
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
      date: new Date()
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'real title',
      date: new Date()
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'real title',
      price: -10,
      date: new Date()
    })
    .expect(400);
});

it('returns an error if an invalid date is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'real title',
      date: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'real title',
      price: -10,
    })
    .expect(400);
});


it('creates a ticket with valid inputs', async () => {
  // add in a check to make sure a ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'real title',
      price: 20,
      date: new Date()
    })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
});

it('publishes an event', async () => {
  const title = 'real title';

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
      date: new Date()
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
