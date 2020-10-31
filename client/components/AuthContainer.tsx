import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { TextField } from './TextField';
import { Errors } from './Errors';
import { Button, ButtonType } from './Button';
import { Link } from './Link';
import { Error } from '../types';

export enum AuthTitle {
	signUp = 'Sign Up',
	signIn = 'Sign In',
}

interface Props {
	handleOnSubmit: (event: any) => Promise<void>;
	errors: Error[];
	title: AuthTitle;
	userInfo: {
		email: string;
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
		setEmail: Dispatch<SetStateAction<string>>;
	};
}

export const AuthContainer: React.FC<Props> = ({ handleOnSubmit, errors, title, userInfo }) => {
	const { email, password, setEmail, setPassword } = userInfo;
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
						<Button message={title} type={ButtonType.submit} />
						{title === AuthTitle.signIn && <Link message="Forgot password?" link="#" />}
					</div>
				</form>
				<p className="text-center text-gray-500 text-xs">
					&copy;2020 Tickets.dev All rights reserved.
				</p>
			</div>
		</div>
	);
};
