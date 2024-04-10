import { get } from "svelte/store";
import { token } from "../stores";
import type { Bucket, Note } from "./types";

let path = import.meta.env.VITE_PATH;
export const deleteNote = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/byid`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify({ _id: id }),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const deleteBucket = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/bucketlist/bybucketId`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify({ _id: id }),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};
export const deleteCard = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/flashcards/bycardId`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify({ _id: id }),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const addNote = (note: Note) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(note),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const addBucket = (bucket: Bucket) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/bucketlist/bybucket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(bucket),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};
export const addCard = (bucket: Bucket) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/flashcards/bycard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(bucket),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const getNote = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/note?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const getBucket = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/bucketlist/bybucket?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};
export const getCard = (id: string) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/flashcards/bycard?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};
export const updateNote = (note: Note) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/note`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(note),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const updateBucket = (bucket: Bucket) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/flashcards/bycard`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(bucket),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const updateCard = (bucket: Bucket) => {
  const tokenValue = get(token);

  const res = fetch(`${path}/api/flashcards/bycard`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue,
    },
    body: JSON.stringify(bucket),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};

export const resetPassword = (token, password) => {
  const res = fetch(`${path}/api/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, password }),
  }).then((response) => response.json()).then((data) => {
    return data;
  });
  return res;
};
