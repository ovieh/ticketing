import { FC, Fragment } from 'react';
import { TextFieldProps } from '../types';
import clsx from 'clsx';

export const TextField: FC<TextFieldProps> = ({ name, message, onChange, onBlur, type, value, error }) => {
	return (
		<Fragment>
			<label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
				{message}
			</label>
			<input
				className={clsx(
					'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
					{ 'border-red-500': !!error }
				)}
				type={type}
				id={name}
				required
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</Fragment>
	);
};
