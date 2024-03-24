
<script>
  import { onMount } from "svelte";
  import { flashCardsStore, token, userdetails,
  userModal,selectedCardTag,selectedCardDate,searchCardTerm } from "../stores.js";
  import { navigate } from "svelte-routing";
  import { icons } from "feather-icons";

  import Loading from "./Loading.svelte";
  import FlashCardModel from "../components/CardModel.svelte";
  import UserProfile from "../components/UserProfile.svelte";
  import Tag from "../components/Tag.svelte";
  import Search from "../components/Search.svelte";
  import { addCard, getCard } from "../utils/db.js";
  import { get,derived } from "svelte/store";
  let modalNote = null;
  let modalAction = null;
  let isAuthenticated = false;

  import Card from "./flashcards/Card.svelte";
  import { path } from "../stores.js";
  const updateCards = (data) => {
    flashCardsStore.set(data);
  };

  $: cards= $flashCardsStore;

  onMount(async () => {
    isAuthenticated = !!$userdetails;
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect them to the login page
      navigate("/login");
    }

    try {
      (async () => {
        // Wrap the async function properly
        const response = await fetch(`${$path}/api/flashcards/bycards`, {
          headers: { Authorization: $token },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        updateCards(data);
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
				? $flashCardsStore.filter((note) => note.tags.includes($selectedCardTag))
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
						const selectedDateWithoutTime = new Date($selectedCardDate)
							.toISOString()
							.split("T")[0];
						return noteDateWithoutTime === selectedDateWithoutTime;
					})
				: $filteredCards,
	);

</script>

{#if $userdetails}
  <div class="main-body">
    <div class="header">
      <div class="title-wrapper">
        <img src="bucket.png" alt="Logo" class="logo" />
        <h1>Flash Cards</h1>
      </div>

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

    <div class="buckets">

	        <div class="tag-wrapper">
                <Tag
                    localStore={$flashCardsStore}
                    bind:selectedTag={$selectedCardTag}
                />
            </div>
            <div class="search">
                <Search bind:searchTerm={$searchCardTerm} />
                <input type="date" bind:value={$selectedCardDate} />
            </div>
            <div class="notes-wrapper">
                <Card cardsProp={$filteredCardsByDate} />
            </div>

    </div>
    {#if modalAction == "new"}
      <FlashCardModel {modalNote} {modalAction} {closeModal} {handleAction} />
    {/if}
    {#if $userModal}
      <UserProfile {closeModal} {signout} />
    {/if}
  </div>
{:else}
  <!-- Show a loading spinner or some other placeholder while the authentication check is in progress -->
  <Loading />
{/if}

<style>
  .buckets {
    display: grid;
    grid-template-rows: repeat(1fr);
    gap: 20px;
  }
  .main-container {
    display: flex;
    flex-direction: row;
  }
  .main-body {
    width: 100%;
    height: 100vh;
    overflow: scroll;
  }
  .header {
    position: relative;
  }

  :global(.header .add) {
    height: auto;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-20%);
    background-color: transparent;
    border: none;
    margin: none;
    padding: none;
  }
  :global(.header .user-profile) {
    height: auto;
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-20%);
    background-color: transparent;
    border: none;
    margin: none;
    padding: none;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  } 
  .notes-wrapper{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin:5px;
  }
</style>
