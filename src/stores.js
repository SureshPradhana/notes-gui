import { readable, writable } from "svelte/store";

export let notesStore = writable([]);
export let bucketsStore = writable([]);
export let flashCardsStore = writable([]);

export const selectedTag = writable("All");
export const searchTerm = writable("");
export const selectedDate = writable("");
export const selectedCardTag = writable("All");
export const searchCardTerm = writable("");
export const selectedCardDate = writable("");
export const loading = writable(true);
export const token = writable("");
export const user = writable("");
export const status = writable("");
export const userdetails = writable("");
// export const path = readable("http://localhost:3000");
export const userModal = writable(false);
export const modalAction = writable(false);
export const loadingStatus = writable(false);
export const message = writable({ message: "", type: "" });
export const pageStatus = writable("");
export const path = readable("https://notes-api-3xdk.onrender.com");
