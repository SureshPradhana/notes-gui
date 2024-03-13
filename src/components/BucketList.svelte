<script>
  import { onMount } from "svelte";
  import { bucketsStore, token, userdetails, userModal } from "../stores.js";
  import { navigate } from "svelte-routing";
  import { icons } from "feather-icons";

  import Loading from "./Loading.svelte";
  import BucketModal from "../components/BucketModel.svelte";
  import UserProfile from "../components/UserProfile.svelte";
  import { addBucket, getBucket } from "../utils/db.js";
  import { get } from "svelte/store";
  let modalNote = null;
  let modalAction = null;
  let isAuthenticated = false;
  // let user;

  import Box from "./bucketlist/Box.svelte";
  import { path } from "../stores.js";
  const updateBuckets = (data) => {
    bucketsStore.set(data);
  };

  $: buckets = $bucketsStore;

  onMount(async () => {
    isAuthenticated = !!$userdetails;
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect them to the login page
      navigate("/login");
    }

    try {
      (async () => {
        // Wrap the async function properly
        const response = await fetch(`${$path}/api/bucketlist/bybuckets`, {
          headers: { Authorization: $token },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        updateBuckets(data);
      })();
    } catch (error) {
      console.log(error);
    }
  });

  async function handleAction(note) {
    let res = await addBucket(note);
    let newNote = await getBucket(res.insertedId);
    if (newNote) {
      bucketsStore.update((notes) => {
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
</script>

{#if $userdetails}
  <div class="main-body">
    <div class="header">
      <div class="title-wrapper">
        <img src="bucket.png" alt="Logo" class="logo" />
        <h1>Bucket List</h1>
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
      <Box notesProp={buckets} />
    </div>
    {#if modalAction == "new"}
      <BucketModal {modalNote} {modalAction} {closeModal} {handleAction} />
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
</style>
