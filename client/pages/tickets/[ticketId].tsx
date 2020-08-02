import { Ticket, Order, User } from '../../types';
import { Button, ButtonType } from '../../components/Button';
import { useRequest } from '../../hooks/use-request';
import { Errors } from '../../components/Errors';
import Router from 'next/router';
import { Card } from '../../components/Card';
import { GetServerSideProps } from 'next';
import axios from 'axios';


interface TicketShowProps {
	ticket: Ticket;
	currentUser: User;
}

export const TicketShow = ({ ticket, currentUser }: TicketShowProps) => {
	const [doRequest, errors] = useRequest({
		url: '/api/orders',
		method: 'post',
		body: { ticketId: ticket.id },
		onSuccess: (order: Order) => {
			Router.push('/orders/[orderId]', `/orders/${order.id}`);
		},
	});

	return (
		<div className="flex justify-center">
			<Card ticket={ticket}>
				<Button
					onClick={currentUser ? () => doRequest() : () => Router.push('/auth/signin')}
					message="Purchase"
					type={ButtonType.button}
				/>
			</Card>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { ticketId } = params;
	const { data: ticket } = await axios.get(`http://tickets-srv:3000/api/tickets/${ticketId}`);
	return { props: { ticket } };
};

export default TicketShow;
