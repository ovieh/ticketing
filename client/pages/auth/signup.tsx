import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';
import { AuthContainer, AuthTitle } from '../../components/AuthContainer';

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

	const userInfo = {
		email,
		password,
		setEmail,
		setPassword,
	};

	return (
		<AuthContainer
			errors={errors}
			handleOnSubmit={handleOnSubmit}
			title={AuthTitle.signUp}
			userInfo={userInfo}
		/>
	);
}
