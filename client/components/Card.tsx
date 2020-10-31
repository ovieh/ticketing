import Image from 'next/image'
import { Ticket } from '../types';
import TicketShow from '../pages/tickets/[ticketId]';

interface CardProps {
	ticket: Ticket;
}

export const Card: React.FC<CardProps> = ({ ticket: { price, title, date }, children }) => {
	const perfomanceDate = new Date(date);
	const dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return (
		<div className="overflow-hidden bg-dark-blue max-w-sm rounded shadow-lg mb-2 mt-2">
			<Image src="/img/card-image.jpeg" alt="Concert Image" width={300} height={200} loading="lazy"/>
			<div className="px-6 py-4">
				<h3 className="text-2xl font-bold mb-2">{title}</h3>
				<p className="text-lg mb-2">${price.toFixed(2)}</p>
				<p className="text-lg mb-2">
					{perfomanceDate.toLocaleDateString('en', dateOptions)}
				</p>
				{children}
			</div>
		</div>
	);
};
