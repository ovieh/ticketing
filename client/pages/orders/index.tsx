import { Order } from '../../types';
import { Card } from '../../components/Card';

const OrderIndex = ({ orders }) => {
	return (
		<div className="flex flex-wrap justify-around mt-1">
			{orders.map((order: Order) => (
				<Card key={order.id} ticket={order.ticket}>
					<p className="text-green-500 capitalize">{order.status}</p>
				</Card>
			))}
		</div>
	);
};

OrderIndex.getInitialProps = async (context, client) => {
	const { data } = await client.get('/api/orders');

	return { orders: data };
};

export default OrderIndex;
