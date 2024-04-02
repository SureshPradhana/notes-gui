<script>
  import { onMount } from "svelte";
  import { SyncLoader } from "svelte-loading-spinners";
  import {
    bucketsStore,
    token,
    userdetails,
    userModal,
    path,
    loadingServer,
  } from "../../stores";
  import { navigate } from "svelte-routing";
  import { icons } from "feather-icons";

  import Loading from "../componenthub/Loading.svelte";
  import BucketModal from "./BucketModel.svelte";
  import UserProfile from "../componenthub/UserProfile.svelte";
  import Box from "./Box.svelte";
  import { addBucket, getBucket } from "../../utils/db";
  import { get } from "svelte/store";
  let modalNote = null;
  let modalAction = null;
  let isAuthenticated = false;

  const updateBuckets = (data) => {
    bucketsStore.set(data);
  };

  $: buckets = $bucketsStore;

  $: if ($loadingServer.status === "NAVIGATING") {
    setTimeout(() => {
      if ($loadingServer.status === "NAVIGATING") {
        $loadingServer.status = "LOADING";
      }
    }, 400);
  }
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
        const response = await fetch(`${$path}/api/bucketlist/bybuckets`, {
          headers: { Authorization: $token },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        updateBuckets(data);
        loadingServer.setLoading(false);
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

    {#if $loadingServer.status === "LOADING"}
      <div class="loader">
        <SyncLoader size="45" color="#b36f61" unit="px" duration="1s" />
      </div>
    {:else}
      <div class="buckets">
        <Box notesProp={buckets} />
      </div>
    {/if}
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
    .tag-wrapper {
      @include tag-wrapper();
    }
  }
</style>
