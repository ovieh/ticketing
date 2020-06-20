import { Ticket, User } from '../types';
import Link from 'next/link';
// TODO: come up with typeo for currentUser
interface LandingPageProps {
	currentUser: User;
	tickets: Ticket[];
}

console.log('Does this show up anywhere in the client');


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
