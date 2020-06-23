import React from 'react';
import { Ticket } from '../types';

interface CardProps {
	ticket: Ticket;
}

export const Card: React.FC<CardProps> = ({ ticket: { price, title }, children }) => {
	return (
		<div className="overflow-hidden bg-dark-blue max-w-sm rounded shadow-lg mb-2 mt-2">
			<img
				className="w-full"
				src={require('../public/img/card-image.jpeg?size=336')}
				alt="Concert Image"
			/>
			<div className="px-6 py-4">
				<h3 className="text-2xl font-bold mb-2">{title}</h3>
				<p className="text-lg mb-2">
					<span>price: </span>${price.toFixed(2)}
				</p>
				{children}
			</div>
		</div>
	);
};
