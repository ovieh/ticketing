import { Ticket, User } from '../types';
import Link from 'next/link';
import Head from 'next/head';
// TODO: come up with typeo for currentUser
interface LandingPageProps {
	currentUser: User;
	tickets: Ticket[];
}

export default function LandingPage({ currentUser, tickets }: LandingPageProps) {
	const ticketList = tickets.map((ticket) => (
		<tr key={ticket.id}>
			<td className="border px-4 py-2">{ticket.title}</td>
			<td className="border px-4 py-2">{ticket.price}</td>
			<td className="border px-4 py-2">
				<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
					<a>View</a>
				</Link>
			</td>
		</tr>
	));

	return (
		<div>
			<Head>
				<title>Tickets!</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h1>Tickets</h1>
			<table className="table-fixed">
				<thead>
					<tr>
						<th className="border w-1/4 px-4 py-2">Title</th>
						<th className="border w-1/4 px-4 py-2">Price</th>
						<th className="border w-1/4 px-4 py-2">Link</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	);
}
LandingPage.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get('/api/tickets');

	return { tickets: data };
};
