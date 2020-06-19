import React from 'react';
import { Links } from '../types';

interface LinkProps extends Links {};

export const Link: React.FC<LinkProps> = ({ link, message }) => {
	return (
		<a
			className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
			href={link}
		>
			{message}
		</a>
	);
};
