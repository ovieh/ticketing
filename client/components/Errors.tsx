import { FC } from 'react';

interface ErrorsProps {
	errors: Error[];
}

export const Errors = ({ errors }) => {

	if (!errors.length) return null;

	return (
		<div className="bg-red-500 px-8 py-4 mt-1 mb-2 rounded">
			<h3 className="text-3xl text-red-900">Oops!</h3>
			<ul className="list-disc">
				{errors.map(({ message }) => (
					<li className="text-red-100 text-sm italic" key={`error-${message}`}>
						{message}
					</li>
				))}
			</ul>
		</div>
	);
};
