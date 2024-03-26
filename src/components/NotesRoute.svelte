<script>
	import { onMount } from "svelte";
	import {
		token,
		userdetails,
		path,
		notesStore,
		loading,
		selectedTag,
		searchTerm,
		selectedDate,
		message,
	} from "../stores.js";

	import { jwtDecode } from "jwt-decode";
	import Loading from "./Loading.svelte";
	import Modal from "./Modal.svelte";
	import UserProfile from "./UserProfile.svelte";
	import Notes from "./Notes.svelte";
	import Tag from "./Tag.svelte";
	import Search from "./Search.svelte";
	import { derived } from "svelte/store";
	import { userModal } from "../stores.js";
	import { icons } from "feather-icons";

	import { addNote, getNote, updateNote } from "../utils/db.js";
	import MessagePopup from "./MessagePopup.svelte";
	import { navigate } from "svelte-routing";

	let modalNote = null;
	let modalAction = null;

	let loadingStatus = false;

	onMount(() => {
		// Fetch data from the server
		let messagetemp = $message;
		token.set(localStorage.getItem("token"));
		if ($token) {
			userdetails.set(jwtDecode($token).user);

			try {
				(async () => {
					const response = await fetch(`${$path}/api/notes`, {
						headers: {
							Authorization: $token,
						},
					});

					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();

					updateNotes(data);
					updateLoading(false);
				})();
			} catch (error) {
				loading.set(true);
			}
		} else {
			navigate("/login");
		}
	});

	$: {
		if ($token) {
			const decodedToken = jwtDecode($token);
			userdetails.set(decodedToken.user);
			try {
				(async () => {
					// Wrap the async function properly
					const response = await fetch(`${path}/api/notes`, {
						headers: {
							Authorization: $token,
						},
					});
					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();
					updateNotes(data);
					updateLoading(false);
				})(); // Call the async function immediately
			} catch (error) {
				loading.set(true);
			}
		} else {
			notesStore.set([]);
			loading.set(false);
		}
	}

	async function handleAction(note) {
		let res = await addNote(note);
		let newNote = await getNote(res.insertedId);
		if (newNote) {
			notesStore.update((notes) => {
				return [newNote, ...notes];
			});
		}
		modalNote = null;
		modalAction = null;
	}
	function openModal(note, action) {
		modalNote = note;
		modalAction = action;
	}

	function openUserModal() {
		$userModal = true;
	}

	function closeModal() {
		modalNote = null;
		modalAction = null;

		$userModal = false;
	}

	const updateNotes = (data) => {
		notesStore.set(data);
	};

	const updateLoading = (data) => {
		loading.set(data);
	};
	async function signout() {
		localStorage.removeItem("token");
		token.set("");
		userdetails.set({});
		pageStatus = "home";
		closeModal();
		navigate("/login");
	}

	function openMenu() {
		menuOpen = !menuOpen;
	}

	let pageStatus = "home";
	let menuOpen = false;

	// Filtering notes by tag
	let filteredNotesByTag = derived(
		[notesStore, selectedTag],
		([$notesStore, $selectedTag]) =>
			$selectedTag !== "All" && $selectedTag
				? $notesStore.filter((note) => note.tags.includes($selectedTag))
				: $notesStore,
	);

	// Filtering notes by search term
	let filteredNotesBySearchTerm = derived(
		[filteredNotesByTag, searchTerm],
		([$filteredNotes, $searchTerm]) =>
			$searchTerm
				? $filteredNotes.filter((note) =>
						note.content
							.toLowerCase()
							.includes($searchTerm.toLowerCase()),
					)
				: $filteredNotes,
	);

	// Filtering notes by date
	let filteredNotesByDate = derived(
		[filteredNotesBySearchTerm, selectedDate],
		([$filteredNotes, $selectedDate]) =>
			$selectedDate
				? $filteredNotes.filter((note) => {
						const noteDateWithoutTime = new Date(note.date)
							.toISOString()
							.split("T")[0];
						const selectedDateWithoutTime = new Date($selectedDate)
							.toISOString()
							.split("T")[0];
						return noteDateWithoutTime === selectedDateWithoutTime;
					})
				: $filteredNotes,
	);
</script>

{#if Object.keys($userdetails).length != 0}
	<div class="main-body">
		<div class="status">
			{#if loadingStatus}
				<Loading />
			{/if}

			{#if $message}
				<!-- <MessagePopup {message} /> -->
			{/if}
		</div>

		<div class="header">
			<h1>Notes</h1>
			<div class="add">
				<button
					class="add-button"
					on:click={() => openModal(null, "new")}
				>
					{@html icons["edit"].toSvg({
						class: "feather card edit",
						width: "18px",
						height: "18px",
					})}
				</button>
				<!-- <button class="menu" on:click={() => openMenu()}>
                {@html icons["menu"].toSvg({
                    class: "feather card menu",
                    width: "18px",
                    height: "18px",
                })}
            </button> -->
			</div>
		</div>
		<div class="tag-wrapper">
			<Tag localStore={$notesStore} bind:selectedTag={$selectedTag} />
		</div>
		<div class="search">
			<Search bind:searchTerm={$searchTerm} />
			<input type="date" bind:value={$selectedDate} />
		</div>
		<div class="notes-wrapper">
			<Notes notesProp={$filteredNotesByDate} />
		</div>
		{#if modalAction == "new"}
			<Modal {modalNote} {modalAction} {closeModal} {handleAction} />
		{/if}
		{#if $userModal === true}
			<UserProfile {closeModal} {signout} />
		{/if}
	</div>
{/if}

<style lang="scss">
	.header {
		position: relative;
	}
	.main-body {
		width: 100%;
		height: 100vh;
		overflow: scroll;
	}

	input[type="date"] {
		padding: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		font-size: 16px; /* Adjust font size as needed */
		background-color: #2b2a33;
	}

	/* Styling the date picker arrow */
	input[type="date"]::-webkit-calendar-picker-indicator {
		background: transparent;
		color: #333; /* Change color of the arrow */
		cursor: pointer;
	}

	/* Styling placeholder text */
	input[type="date"]::placeholder {
		color: #999; /* Change color of the placeholder text */
	}
</style>
