import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to the db
  await ticket.save();

  // fetch the ticket twice
  const firstInsance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two seperate changes to the tickets we fetched
  firstInsance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  // save the first fetched ticket
  await firstInsance?.save();

  // save the second fetched ticket
  try {
    await secondInstance?.save();

  } catch (err) {
      return done();
  }
  throw new Error('Should not reach this point');
  
});

it('version number increments on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123',
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
    
});

