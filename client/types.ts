export interface TextFieldProps {
	name: string;
	message: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type: string;
	value?: string;
	error?: Error;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type Error = {
	message: string;
	field: string;
};

export type Links = {
	link: string;
	message: string;
};

export enum HeaderType {
	active = 'active',
	link = 'link',
	disabled = 'disabled',
}

export interface HeaderLinks extends Links {
	type: HeaderType;
	active: boolean;
}

export interface Ticket {
	id: number;
	title: string;
	price: number;
	date: Date;
}

export interface Order {
	id: number;
	ticket: Ticket;
	status: string;
	expiresAt: Date;
}

export interface User {
	id: string;
	email: string;
	iat: number;
}