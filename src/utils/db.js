
import { get } from 'svelte/store';
import { token } from '../stores.js';


var path = 'https://notes-api-3xdk.onrender.com';
//var path = 'http://localhost:3000';

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

export const deleteBucket = (id) => {

	var tokenValue = get(token);

	var res = fetch(`${path}/api/bucketlist/bybucketId`, {
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
export const deleteCard = (id) => {

	var tokenValue = get(token);

	var res = fetch(`${path}/api/flashcards/bycardId`, {
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

export const addBucket = (bucket, completed) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/bucketlist/bybucket`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(bucket, completed)
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}
export const addCard = (bucket) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/flashcards/bycard`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(bucket)
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

export const getBucket = (id) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/bucketlist/bybucket/?id=${id}`, {
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
export const getCard = (id) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/flashcards/bycard/?id=${id}`, {
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


export const updateBucket = (bucket) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/flashcards/bycard`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(bucket)
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}


export const updateCard = (bucket) => {
	var tokenValue = get(token);

	var res = fetch(`${path}/api/flashcards/bycard`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenValue,
		},
		body: JSON.stringify(bucket)
	}).then(response => response.json()).then(data => {
		return data;
	});
	return res;
}

