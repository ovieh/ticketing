import { Button, ButtonType } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';
import { Errors } from '../../components/Errors';
import Datepicker from 'react-datepicker';

const NewTicket = () => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [startDate, setStartDate] = useState(new Date());

	const [doRequest, errors] = useRequest({
		url: '/api/tickets',
		method: 'post',
		body: { title, price, date: startDate },
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
					<label
						htmlFor="Datepicker"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Performance Date
					</label>
					<Datepicker
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="MMMM d, yyyy h:mm aa"
						// minDate={new Date()}
						// style={{ width: '100%' }}
						customInput={
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
						}
					/>
				</div>
				<Errors errors={errors} />
				<Button message="Submit" type={ButtonType.submit} />
			</form>
		</div>
	);
};

export default NewTicket;
