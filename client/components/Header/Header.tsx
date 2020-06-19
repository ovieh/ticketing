import React from 'react';
import { HeaderLink } from './components/HeaderLink';
import { HeaderLinks } from '../../types';
import Link from 'next/link';

interface Props {
	currentUser: {
		id: string;
		email: string;
		iat: number;
	};
}

export const Header: React.FC<Props> = ({ children, currentUser }) => {
	const links: Array<HeaderLinks> = [
		{
			message: 'Sign Up',
			link: '/auth/signup',
			type: 'active',
			active: !currentUser,
		},
		{
			message: 'Sign In',
			link: '/auth/signin',
			type: 'active',
			active: !currentUser,
		},
		{
			message: 'Sell Tickets',
			link: '/tickets/new',
			type: 'active',
			active: !!currentUser,
		},
		{
			message: 'My Orders',
			link: '/orders',
			type: 'active',
			active: !!currentUser,
		},
		{
			message: 'Sign Out',
			link: '/auth/signout',
			type: 'active',
			active: !!currentUser,
		},
	];
	return (
		<nav className="py-2 px-4 bg-gray-800 flex justify-between items-center">
			<div className="text-2xl text-green-500 font-thin">
				<Link href="/">
					<a>Tickets!</a>
				</Link>
			</div>

			<ul className='flex'>
				{links.map(({ message, link, type, active }) => (
					<HeaderLink
						key={message}
						link={link}
						message={message}
						type={type}
						active={active}
					/>
				))}
				{children}
			</ul>
		</nav>
	);
};
