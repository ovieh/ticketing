import { User, Ticket } from '../types';
import Link from 'next/link';
import { Card } from '../components/Card';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import dbConnect from '../utils/dbConnect';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { data: tickets } = await axios.get('http://tickets-srv:3000/api/tickets');
	return { props: { tickets } };
};
