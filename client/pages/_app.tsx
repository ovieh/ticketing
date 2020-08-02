import '../css/tailwind.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Header } from '../components/Header/Header';
import buildClient from '../api/build-client';
import Head from 'next/head';

export default function AppComponent({ currentUser, pageProps, Component})  {
	return (
		<>
			<Head>
				<title>Tickets!</title>
				<meta charSet="utf-8" />
				<meta name="description" content="Place to buy and sell tickets" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header currentUser={currentUser} />
			<div className="container mx-auto px-12">
				<Component currentUser={currentUser} {...pageProps} />
			</div>
		</>
	);
}

AppComponent.getInitialProps = async (appContext) => {
	const client = await buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			data.currentUser
		);
	}

	return {
		pageProps,
		...data,
	};
};
