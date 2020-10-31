import clsx from 'clsx';
import { HeaderLinks } from '../../../types';
import Link from 'next/link';

interface HeaderLinkProps extends HeaderLinks {}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ type, link, message, active }) => {
	return (
		<li className="pl-2">
			<Link href={link}>
				<a
					className={clsx(
						{
							'text-blue-500 hover:text-blue-800':
								type === 'active' || type === 'link',
							'text-gray-400 cursor-not-allowed': type === 'disabled',
						},
						{ hidden: !active }
					)}
				>
					{message}
				</a>
			</Link>
		</li>
	);
};
