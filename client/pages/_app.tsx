import '../css/tailwind.css';
import { AppProps, AppContext } from 'next/app';
import { Header } from '../components/Header/Header';
import buildClient from '../api/build-client';
import { GetServerSidePropsContext } from 'next';

export default function AppComponent({ Component, pageProps, currentUser }) {
	return (
		<>
			<Header currentUser={currentUser}></Header>
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
