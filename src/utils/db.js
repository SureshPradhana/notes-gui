
import { get } from 'svelte/store';
import { token } from '../stores.js';


var path = 'https://notes-api-3xdk.onrender.com';
export const deleteNote = (id) => {

	var tokenValue = get(token);

	var res = fetch(`${path}/api/byid/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify({ _id: id })
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}

export const addNote = (note) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/note/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(note)
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}

export const getNote = (id) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/note/?id=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		}
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}

export const updateNote = (note) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/note/`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(note)
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}

