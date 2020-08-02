import { Order } from '../../types';
import { Card } from '../../components/Card';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const OrderIndex = ({ orders, ...rest }) => {
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

export const getServerSideProps: GetServerSideProps = async ({ req, ...rest }) => {

	const { data } = await axios.get(`http://orders-srv:3000/api/orders`, {
		headers: req.headers,
	});
	return { props: { orders: data } };
};


export default OrderIndex;
