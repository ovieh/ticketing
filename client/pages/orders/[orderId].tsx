import { useEffect, useState } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useRequest } from '../../hooks/use-request';
import { Errors } from '../../components/Errors';
import Router from 'next/router';
import { Order, User } from '../../types';

interface OrderShowProps {
	order: Order;
	currentUser: User;
}

const OrderShow = ({ order, currentUser: { email } }: OrderShowProps) => {
	const [timeleft, setTimeleft] = useState(0);
	const [doRequest, errors] = useRequest({
		url: '/api/payments',
		method: 'post',
		body: {
			orderId: order.id,
		},
		onSuccess: () => Router.push('/orders'),
	});
	useEffect(() => {
		function findTimeLeft() {
			const msLeft = (new Date(order.expiresAt) as any) - (new Date() as any);
			setTimeleft(Math.round(msLeft / 1000));
		}
		findTimeLeft();
		const interval = setInterval(findTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [order]);

	if (timeleft <= 0) {
		return <div>Order Expired!</div>;
	}

	return (
		<div className="flex">
			<div>Time left to pay: {timeleft} seconds</div>
			<div>
				<StripeCheckout
					stripeKey={process.env.STRIPE_KEY}
					token={({ id }: Token) => doRequest({ token: id })}
					amount={order.ticket.price * 100}
					email={email}
				/>
			</div>
			<Errors errors={errors} />
		</div>
	);
};

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);

	return { order: data };
};

export default OrderShow;
