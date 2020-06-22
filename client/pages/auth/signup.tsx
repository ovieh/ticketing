import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';
import { AuthContainer } from '../../components/AuthContainer';

export default function signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [doRequest, errors] = useRequest({
		url: '/api/users/signup',
		method: 'POST',
		body: { email, password },
		onSuccess: () => Router.push('/'),
	});

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		await doRequest();
	};

	return (
		<AuthContainer
			email={email}
			password={password}
			errors={errors}
			handleOnSubmit={handleOnSubmit}
			setEmail={setEmail}
			setPassword={setPassword}
			title={"Sign Up"}
		/>
	);
}
