import axios from 'axios';
import { env } from '../config/env';

export function login(data) {
	return axios(env.API_ENV.url + '/api/User/login', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
