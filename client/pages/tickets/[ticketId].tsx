import { Ticket, Order } from '../../types';
import { Button } from '../../components/Button';
import { useRequest } from '../../hooks/use-request';
import { Errors } from '../../components/Errors';
import Router from 'next/router';

interface TicketShowProps {
	ticket: Ticket;
}

export const TicketShow = ({ ticket }: TicketShowProps) => {
	const [doRequest, errors] = useRequest({
		url: '/api/orders',
		method: 'post',
		body: { ticketId: ticket.id },
		// onSuccess: () => Router.push('/'),
		onSuccess: (order: Order) => {
			Router.push('/orders/[orderId]', `/orders/${order.id}`)
		},
	});

	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
			<Errors errors={errors} />
			<Button onClick={() => doRequest()} message="Purchase" type="button" />
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
