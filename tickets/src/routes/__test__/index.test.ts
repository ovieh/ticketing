import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const createTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'concert',
      price: 20,
    })
    .expect(201);
};

it('returns all ticket', async () => {
  // add in a check to make sure a ticket was saved
  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await createTicket();
  await createTicket();
  await createTicket();


  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);
  expect(response.body.length).toEqual(3);
});
