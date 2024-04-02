import { readable, writable } from "svelte/store";

export const notesStore = writable([]);
export const bucketsStore = writable([]);
export const flashCardsStore = writable([]);

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

const newLoading = () => {
  const { subscribe, update, set } = writable({
    status: "IDLE", // IDLE, LOADING, NAVIGATING
    message: "",
  });

  function setNavigate(isNavigating: boolean) {
    update(() => {
      return {
        status: isNavigating ? "NAVIGATING" : "IDLE",
        message: "",
      };
    });
  }

  function setLoading(isLoading: boolean, message: string = "") {
    update(() => {
      return {
        status: isLoading ? "LOADING" : "IDLE",
        message: isLoading ? message : "",
      };
    });
  }

  return { subscribe, update, set, setNavigate, setLoading };
};

export const loadingServer = newLoading();

export const themeStore = writable("light");
