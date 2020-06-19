import { Order } from '../../types';

const OrderIndex = ({ orders }) => {
	return (
		<div className='mt-1'>
			<ul className='list-none'>
				{orders.map((order: Order) => (
					<li key={order.id}>
						{order.ticket.title} - {order.status}
					</li>
				))}
			</ul>
		</div>
	);
};

OrderIndex.getInitialProps = async (context, client) => {
	const { data } = await client.get('/api/orders');

	return { orders: data };
};

export default OrderIndex;
