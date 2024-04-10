<script>
	import { onMount } from "svelte";
	import { SyncLoader } from "svelte-loading-spinners";
	import {
		token,
		userdetails,
		path,
		notesStore,
		loading,
		selectedTag,
		searchTerm,
		selectedDate,
		loadingServer,
	} from "../../stores";

	import { jwtDecode } from "jwt-decode";
	import Modal from "./Modal.svelte";
	import UserProfile from "../componenthub/UserProfile.svelte";
	import Notes from "./Notes.svelte";
	import Tag from "../componenthub/Tag.svelte";
	import Search from "../componenthub/Search.svelte";
	import Dropdown2 from "../componenthub/Dropdown2.svelte";
	import { derived } from "svelte/store";
	import { userModal } from "../../stores";
	import { icons } from "feather-icons";

	import { addNote, getNote, updateNote } from "../../utils/db";
	import { navigate } from "svelte-routing";

	let modalNote = null;
	let modalAction = null;

	$: if ($loadingServer.status === "NAVIGATING") {
		setTimeout(() => {
			if ($loadingServer.status === "NAVIGATING") {
				$loadingServer.status = "LOADING";
			}
		}, 400);
	}
	let tagsList = [];

	$: tagsList = [...new Set($notesStore.flatMap((note) => note.tags))];

	$: filteredTags = tagsList.filter((tag) =>
		tag.toLowerCase().includes($selectedTag.toLowerCase()),
	);
	onMount(() => {
		// Fetch data from the server
		token.set(localStorage.getItem("token"));
		if ($token) {
			console.log(jwtDecode($token).user);
			userdetails.set(jwtDecode($token).user);
			loadingServer.setLoading(true, "I'm loading");
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
					loadingServer.setLoading(false);
				})();
			} catch (error) {
				loadingServer.setLoading(true);
			}
		} else {
			navigate("/login");
		}
	});

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
	let select = false;
	let selectedSuggestion = "";

	function selectSuggestion(suggestion) {
		selectedSuggestion = suggestion;
		$selectedTag = suggestion;
		select = true;
	}
	function handleInput(event) {
		selectedSuggestion = "";
		select = false;
		$selectedTag = event.target.value;
	}
</script>

{#if Object.keys($userdetails).length != 0}
	<div class="main-body">
		<div class="header">
			<div class="title-wrapper">
				<h1>Notes</h1>
			</div>
			<button class="add" on:click={() => openModal(null, "new")}>
				{@html icons["edit"].toSvg({
					class: "feather card edit",
					width: "18px",
					height: "18px",
				})}
			</button>
		</div>
		{#if $loadingServer.status === "LOADING"}
			<div class="loader">
				<SyncLoader size="45" color="#b36f61" unit="px" duration="1s" />
			</div>
		{:else}
			<div class="tag-wrapper"></div>
			<div class="search">
				<input
					class="input"
					type="text"
					bind:value={$selectedTag}
					on:input={handleInput}
					placeholder="search by tag"
				/>
				<Search bind:searchTerm={$searchTerm} />
				<input type="date" bind:value={$selectedDate} />
			</div>
			{#if $selectedTag && $selectedTag !== "All"}
				<Dropdown2 {filteredTags} {selectSuggestion} />
			{:else if $selectedTag == "All" || !$selectedTag}
				<Dropdown2 filteredTags={tagsList} {selectSuggestion} />
			{/if}
			<div class="notes-wrapper">
				<Notes notesProp={$filteredNotesByDate} />
			</div>
		{/if}
		{#if modalAction == "new"}
			<Modal {modalNote} {modalAction} {closeModal} {handleAction} />
		{/if}
		{#if $userModal === true}
			<UserProfile {closeModal} {signout} />
		{/if}
	</div>
{/if}

<style lang="scss">
	@import "../styles/mixins.scss";
	.main-body {
		@include main-body();
		.loader {
			@include loader();
		}

		.header {
			@include header();
			.add {
				@include add-new();
			}
			.title-wrapper {
				@include title-wrapper();
				.logo {
					@include logo();
				}
			}
		}

		.tag-wrapper {
			@include tag-wrapper();
		}
	}

	.notes-wrapper {
		@include grid-5-320min();
	}

	.status,
	.header,
	.tag-wrapper {
		@include center();
	}
	.search {
		display: flex;
	}
	.input {
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		border: 1px solid var(--ccc);
		background-color: var(--search-background);
	}

	@media (max-width: 768px) {
		.search {
			flex-direction: column;
		}
	}
</style>
