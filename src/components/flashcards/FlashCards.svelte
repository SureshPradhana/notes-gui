<script>
	import { onMount } from "svelte";
	import { SyncLoader } from "svelte-loading-spinners";
	import {
		flashCardsStore,
		token,
		userdetails,
		userModal,
		selectedCardTag,
		selectedCardDate,
		searchCardTerm,
		path,
		loadingServer,
	} from "../../stores";
	import { navigate } from "svelte-routing";
	import { icons } from "feather-icons";

	import Loading from "../componenthub/Loading.svelte";
	import FlashCardModel from "./CardModel.svelte";
	import UserProfile from "../componenthub/UserProfile.svelte";
	import Tag from "../componenthub/Tag.svelte";
	import Search from "../componenthub/Search.svelte";
	import Dropdown2 from "../componenthub/Dropdown2.svelte";
	import Card from "./Card.svelte";
	import { addCard, getCard } from "../../utils/db";
	import { get, derived } from "svelte/store";
	let modalNote = null;
	let modalAction = null;
	let isAuthenticated = false;
	$: if ($loadingServer.status === "NAVIGATING") {
		setTimeout(() => {
			if ($loadingServer.status === "NAVIGATING") {
				$loadingServer.status = "LOADING";
			}
		}, 400);
	}
	let tagsList = [];

	$: tagsList = [...new Set($flashCardsStore.flatMap((note) => note.tags))];

	$: filteredTags = tagsList.filter((tag) =>
		tag.toLowerCase().includes($selectedCardTag.toLowerCase()),
	);
	const updateCards = (data) => {
		flashCardsStore.set(data);
	};

	$: cards = $flashCardsStore;

	onMount(async () => {
		isAuthenticated = !!$userdetails;
		if (!isAuthenticated) {
			// If the user is not authenticated, redirect them to the login page
			navigate("/login");
		}

		loadingServer.setLoading(true, "I'm loading");
		try {
			(async () => {
				// Wrap the async function properly
				const response = await fetch(
					`${$path}/api/flashcards/bycards`,
					{
						headers: { Authorization: $token },
					},
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await response.json();
				updateCards(data);
				loadingServer.setLoading(false);
			})();
		} catch (error) {
			console.log(error);
		}
	});

	async function handleAction(note) {
		let res = await addCard(note);
		let newNote = await getCard(res.insertedId);
		if (newNote) {
			flashCardsStore.update((notes) => {
				return [newNote, ...notes];
			});
		}
		modalNote = null;
		modalAction = null;
	}

	// openModel

	function openModal(bucket, action) {
		modalNote = bucket;
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

	async function signout() {
		localStorage.removeItem("token");
		$token = "";
		closeModal();
		navigate("/login");
	}

	// Filtering notes by tag
	let filteredCardsByTag = derived(
		[flashCardsStore, selectedCardTag],
		([$flashCardsStore, $selectedCardTag]) =>
			$selectedCardTag !== "All" && $selectedCardTag
				? $flashCardsStore.filter((note) =>
						note.tags.includes($selectedCardTag),
					)
				: $flashCardsStore,
	);

	// Filtering notes by search term
	let filteredCardsBySearchTerm = derived(
		[filteredCardsByTag, searchCardTerm],
		([$filteredCards, $searchCardTerm]) =>
			$searchCardTerm
				? $filteredCards.filter((note) =>
						note.content
							.toLowerCase()
							.includes($searchCardTerm.toLowerCase()),
					)
				: $filteredCards,
	);

	// Filtering notes by date
	let filteredCardsByDate = derived(
		[filteredCardsBySearchTerm, selectedCardDate],
		([$filteredCards, $selectedCardDate]) =>
			$selectedCardDate
				? $filteredCards.filter((note) => {
						const noteDateWithoutTime = new Date(note.date)
							.toISOString()
							.split("T")[0];
						const selectedDateWithoutTime = new Date(
							$selectedCardDate,
						)
							.toISOString()
							.split("T")[0];
						return noteDateWithoutTime === selectedDateWithoutTime;
					})
				: $filteredCards,
	);

	let select = false;
	let selectedSuggestion = "";

	function selectSuggestion(suggestion) {
		selectedSuggestion = suggestion;
		$selectedCardTag = suggestion;
		select = true;
	}
	function handleInput(event) {
		selectedSuggestion = "";
		select = false;
		$selectedCardTag = event.target.value;
	}
</script>

{#if $userdetails}
	<div class="main-body">
		<div class="header">
			<div class="title-wrapper">
				<img src="bucket.png" alt="Logo" class="logo" />
			</div>
			<h1>Flash Cards</h1>

			{#if $userdetails}
				<button class="add" on:click={() => openModal(null, "new")}>
					{@html icons["edit"].toSvg({
						class: "feather card edit",
						width: "18px",
						height: "18px",
					})}
				</button>
			{/if}
		</div>
		<!-- Bucket list component goes here -->

		{#if $loadingServer.status === "LOADING"}
			<div class="loader">
				<SyncLoader size="45" color="#b36f61" unit="px" duration="1s" />
			</div>
		{:else}
			<div class="buckets">
				<div class="search">
					<input
						class="input"
						type="text"
						bind:value={$selectedCardTag}
						on:input={handleInput}
						placeholder="search by tag"
					/>
					<Search bind:searchTerm={$searchCardTerm} />
					<input type="date" bind:value={$selectedCardDate} />
				</div>
				{#if $selectedCardTag && $selectedCardTag !== "All"}
					<Dropdown2 {filteredTags} {selectSuggestion} />
				{:else if $selectedCardTag == "All" || !$selectedCardTag}
					<Dropdown2 filteredTags={tagsList} {selectSuggestion} />
				{/if}
				<div class="notes-wrapper">
					<Card cardsProp={$filteredCardsByDate} />
				</div>
			</div>
		{/if}
		{#if modalAction == "new"}
			<FlashCardModel
				{modalNote}
				{modalAction}
				{closeModal}
				{handleAction}
			/>
		{/if}
		{#if $userModal}
			<UserProfile {closeModal} {signout} />
		{/if}
	</div>
{:else}
	<!-- Show a loading spinner or some other placeholder while the authentication check is in progress -->
	<Loading />
{/if}

<style lang="scss">
	@import "../styles/mixins.scss";
	.main-body {
		@include main-body();
		.loader {
			@include loader();
		}
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

	.notes-wrapper {
		@include grid-5-320min();
	}

	.header,
	.tag-wrapper,
	.search {
		@include center();
	}
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
