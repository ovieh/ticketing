import { Button, ButtonType } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';
import { Errors } from '../../components/Errors';

const NewTicket = () => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [date, setDate] = useState('');

	const [doRequest, errors] = useRequest({
		url: '/api/tickets',
		method: 'post',
		body: { title, price, date },
		onSuccess: () => Router.push('/'),
	});

	const onBlur = () => {
		const value = parseFloat(price);

		if (isNaN(value)) {
			return;
		}

		setPrice(value.toFixed(2));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		doRequest();
	};

	return (
		<div>
			<h1 className="mb-2">Create a Ticket</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<TextField
						name="title"
						message="Title"
						type="text"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setTitle(e.target.value)
						}
						error={errors.filter(({ field }) => field === 'title')[0]}
					/>
				</div>
				<div className="mb-3">
					<TextField
						name="price"
						message="Price"
						type="text"
						value={price}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setPrice(e.target.value)
						}
						onBlur={onBlur}
						error={errors.filter(({ field }) => field === 'price')[0]}
					/>
				</div>
				<div className="mb-3">
					<TextField
						name="date"
						message="Performance Date"
						type="date"
						value={date}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setDate(e.target.value)
						}
						error={errors.filter(({ field }) => field === 'date')[0]}
					/>
				</div>
				{/* {errors.map(({ message }) => (
					<p className="text-red-500 text-xs italic" key={`error-${message}`}>
						{message}
					</p>
				))} */}
				<Errors errors={errors} />
				<Button message="Submit" type={ButtonType.submit} />
			</form>
		</div>
	);
};

export default NewTicket;
