import { Ticket, User } from '../types';
import Link from 'next/link';
import Head from 'next/head';
import { Card } from '../components/Card';

interface LandingPageProps {
	currentUser: User;
	tickets: Ticket[];
}

export default function LandingPage({ currentUser, tickets }: LandingPageProps) {
	const Tickets = tickets.map((ticket) => (
			<Card key={ticket.id} ticket={ticket}>
				<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
					<a className="text-green-500 text-xl hover:text-green-300 cursor-pointer">View</a>
				</Link>
			</Card>
	));

	return (
		<div>
			<h1>Available Now!</h1>
			<div className="flex flex-wrap justify-around">{Tickets}</div>
		</div>
	);
}
LandingPage.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get('/api/tickets');

	return { tickets: data };
};
