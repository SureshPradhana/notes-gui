import { writable } from "svelte/store";

export let notesStore = writable([])

export const selectedTag = writable("All");
export const searchTerm = writable("");
export const selectedDate = writable("");
export const loading = writable(true);
export const token = writable("");
export const user = writable("");
export const status = writable("");
export const userdetails = writable("");
