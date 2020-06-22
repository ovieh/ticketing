import React from 'react';

interface Props {
	type: 'button' | 'submit' | 'reset';
	message: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<Props> = ({ type, message, onClick }) => {
	return (
		<button
			className="bg-dark-blue hover:bg-blue-900 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-green-500 border-2"
			type={type}
			onClick={onClick}
		>
			{message}
		</button>
	);
};
