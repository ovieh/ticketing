import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from './TextField';
import { Errors } from './Errors';
import { Button } from './Button';
import { Link } from './Link';
import { Error } from '../types';

interface Props {
	handleOnSubmit: (event: any) => Promise<void>;
	email: string;
	password: string;
	errors: Error[];
	setPassword: Dispatch<SetStateAction<string>>;
	setEmail: Dispatch<SetStateAction<string>>;
	title: 'Sign In' | 'Sign Up';
}

export const AuthContainer: React.FC<Props> = ({
	handleOnSubmit,
	email,
	password,
	errors,
	setPassword,
	setEmail,
	title,
}) => {
	return (
		<div className="flex justify-center pt-20">
			<div className="w-full max-w-xs">
				<form
					className="bg-dark-blue shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleOnSubmit}
				>
					<h1>{title}</h1>
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
						<Button message={title} type="submit" />
						{title === 'Sign In' && <Link message="Forgot password?" link="#" />}
					</div>
				</form>
				<p className="text-center text-gray-500 text-xs">
					&copy;2020 Tickets.dev All rights reserved.
				</p>
			</div>
		</div>
	);
};
