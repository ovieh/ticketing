import { Ticket, Order } from '../../types';
import { Button, ButtonType } from '../../components/Button';
import { useRequest } from '../../hooks/use-request';
import { Errors } from '../../components/Errors';
import Router from 'next/router';
import { Card } from '../../components/Card';

interface TicketShowProps {
	ticket: Ticket;
}

export const TicketShow = ({ ticket }: TicketShowProps) => {
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
				<Button onClick={() => doRequest()} message="Purchase" type={ButtonType.button} />
			</Card>
		</div>
	);
};

TicketShow.getInitialProps = async (context, client) => {
	const { ticketId } = context.query;
	const { data } = await client.get(`/api/tickets/${ticketId}`);
	return {
		ticket: data,
	};
};

export default TicketShow;
