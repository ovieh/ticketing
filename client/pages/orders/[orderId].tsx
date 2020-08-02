import { useEffect, useState } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useRequest } from '../../hooks/use-request';
import { Errors } from '../../components/Errors';
import Router from 'next/router';
import { Order, User } from '../../types';
import { Alert } from '../../components/Alert';
import axios from 'axios';
import { GetServerSideProps } from 'next';

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
		<div className="flex flex-col justify-center">
			<Alert
				message="To test, use mock values 4242 4242 4242 4242 as the card number and 111 as the
					security code"
			/>
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

export const getServerSideProps: GetServerSideProps = async ({ req, params, ...rest }) => {
	const { orderId } = params;

	const { data } = await axios.get(`http://orders-srv:3000/api/orders/${orderId}`, {
		headers: req.headers,
	});
	return { props: { order: data } };
};

export default OrderShow;
