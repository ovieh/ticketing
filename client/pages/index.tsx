import { Ticket, User } from '../types';
import Link from 'next/link';
import Head from 'next/head';
import { Card } from '../components/Card';
import { Button, ButtonType } from '../components/Button';
// TODO: come up with typeo for currentUser
interface LandingPageProps {
	currentUser: User;
	tickets: Ticket[];
}

export default function LandingPage({ currentUser, tickets }: LandingPageProps) {
	const Tickets = tickets.map((ticket) => (
			<Card key={ticket.id} ticket={ticket}>
				<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
					<a className="text-green-500 text-xl hover:text-green-300">View</a>
				</Link>
			</Card>
	));

	return (
		<div>
			<Head>
				<title>Tickets!</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h1>Tickets</h1>
			<div className="flex flex-wrap justify-between">{Tickets}</div>
		</div>
	);
}
LandingPage.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get('/api/tickets');

	return { tickets: data };
};
