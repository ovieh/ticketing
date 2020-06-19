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
}

export interface HeaderLinks extends Links {
  type: 'active' | 'link' | 'disabled';
  active: boolean;

}

export interface Ticket {
  id: number;
  title: string;
  price: number;
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