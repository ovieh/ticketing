import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { Errors } from '../../components/Errors';

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
		<div className="flex justify-center pt-20">
			<div className="w-full max-w-xs">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleOnSubmit}
				>
					<h1>Sign Up</h1>
					<div className="mb-4">
						<TextField
							message="Email Address"
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
								setEmail(e.target.value)
							}
							name="email"
							type="text"
							value={email}
							error={errors.filter(({ field }) => field === 'email')[0]}
						/>
					</div>
					<div className="mb-6">
						<TextField
							message="Password"
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
								setPassword(e.target.value)
							}
							name="password"
							value={password}
							type="password"
							error={errors.filter(({ field }) => field === 'password')[0]}
						/>
						<Errors errors={errors} />
					</div>

					<div className="flex items-center justify-between">
						<Button message="Sign Up" type="submit" />
						<Link message="Forgot password?" link="#" />
					</div>
				</form>
				<p className="text-center text-gray-500 text-xs">
					&copy;2020 Tickets.dev All rights reserved.
				</p>
			</div>
		</div>
	);
}
