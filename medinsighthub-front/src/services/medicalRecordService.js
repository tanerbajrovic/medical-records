import axios from 'axios';
import { env } from '../config/env';

export function getAll() {
	return axios(env.API_ENV.url + '/api/MedicalRecord', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('medhub-token'),
		},
	});
}

export function create(data) {
	return axios(env.API_ENV.url + '/api/MedicalRecord', {
		method: 'POST',
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('medhub-token'),
		},
	});
}

export function deleteMedicalRecord(id) {
	return axios(env.API_ENV.url + '/api/MedicalRecord/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('medhub-token'),
		},
	});
}

export function get(id) {
	return axios(env.API_ENV.url + '/api/MedicalRecord/' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('medhub-token'),
		},
	});
}

export function update(data) {
	return axios(env.API_ENV.url + '/api/MedicalRecord', {
		method: 'PATCH',
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('medhub-token'),
		},
	});
}
