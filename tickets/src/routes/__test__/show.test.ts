import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if ticket is found', async () => {
  const title = 'concert';
  const price = 20;
  const date = new Date();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
      date,
    })
    .expect(201);

  const id = response.body.id;
  const ticketResponse = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
  expect(ticketResponse.body.date).toEqual(date.toISOString());

});
