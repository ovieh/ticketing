import { HeaderLink } from './components/HeaderLink';
import { HeaderLinks, HeaderType, User } from '../../types';
import Link from 'next/link';

interface HeaderProps {
	currentUser: User;
}

export const Header: React.FC<HeaderProps> = ({ children, currentUser }) => {
	const links: Array<HeaderLinks> = [
		{
			message: 'Sign Up',
			link: '/auth/signup',
			type: HeaderType.active,
			active: !currentUser,
		},
		{
			message: 'Sign In',
			link: '/auth/signin',
			type: HeaderType.active,
			active: !currentUser,
		},
		{
			message: 'Sell Tickets',
			link: '/tickets/new',
			type: HeaderType.active,
			active: !!currentUser,
		},
		{
			message: 'My Orders',
			link: '/orders',
			type: HeaderType.active,
			active: !!currentUser,
		},
		{
			message: 'Sign Out',
			link: '/auth/signout',
			type: HeaderType.active,
			active: !!currentUser,
		},
	];
	return (
		<nav className="py-2 px-4 bg-dark-blue flex justify-between items-center">
			<div className="text-2xl text-green-500 font-semibold">
				<Link href="/">
					<a>Tickets!</a>
				</Link>
			</div>

			<ul className="flex">
				{links
					.filter(({ active }) => active == true)
					.map(({ message, link, type, active }) => (
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
