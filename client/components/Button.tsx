import React from 'react';

interface Props {
	type: 'button' | 'submit' | 'reset';
	message: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<Props> = ({ type, message, onClick }) => {
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type={type}
			onClick={onClick}
		>
			{message}
		</button>
	);
};
