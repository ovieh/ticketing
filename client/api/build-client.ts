import axios from 'axios';

export default async function buildClient({ req }) {
	if (typeof window === 'undefined') {
		// we are in the server
		return axios.create({
			baseURL: 'http://www.ticketing-prod.xyz',
			headers: req.headers,
		});
	} else {
		// we are in the browser
		return axios.create({
			baseURL: '/',
		});
	}
}
