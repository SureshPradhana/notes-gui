<script>
  import { icons } from "feather-icons";

  import { bucketsStore } from "../../stores.js";
  import { deleteBucket, updateBucket } from "../../utils/db.js";
  import BucketModel from "./BucketModel.svelte";
  export let notesProp;

  let modalNote = null;
  let modalAction = null;

  function openModal(bucket, action) {
    modalNote = bucket;
    modalAction = action;
  }
  async function handleDelete(note) {
    // Delete the note

    let res = await deleteBucket(note._id);
    if (res) {
      bucketsStore.update((n) => n.filter((n) => n._id !== note._id));
    }
    modalNote = null;
  }

  async function handleEdit(note) {
    // Edit the note

    let res = await updateBucket(note);
    if (res) {
      bucketsStore.update((n) => n.map((n) => (n._id === note._id ? note : n)));
    }

    modalNote = null;
  }

  function closeModal() {
    modalNote = null;
    modalAction = null;
  }
</script>

{#each notesProp as bucket (bucket._id)}
  <div class="bucket">
    <div class="content-wrapper">
      <p class="content">{bucket.content}</p>
      <label>
        <input
          type="checkbox"
          bind:checked={bucket.completed}
          on:change={() => updateBucket(bucket)}
        />
      </label>
    </div>
    <div class="last">
      <div class="tag-wrapper"></div>
      <div class="edit-wrapper">
        <button on:click={() => openModal(bucket, "edit")}>
          {@html icons["edit-2"].toSvg({
            class: "feather card edit",
            width: "14px",
            height: "14px",
          })}
        </button>
        <button on:click={() => openModal(bucket, "delete")}>
          {@html icons["trash-2"].toSvg({
            class: "feather card trash",
            width: "14px",
            height: "14px",
          })}
        </button>
      </div>
    </div>
  </div>
{/each}

{#if modalNote}
  <BucketModel
    {modalNote}
    {modalAction}
    {closeModal}
    handleAction={modalAction === "delete" ? handleDelete : handleEdit}
  />
{/if}

<style lang="scss">
  @import "../styles/mixins.scss";
  .bucket {
    @include bucket();
    .content-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .content {
        @include content();
      }
    }
    .last {
      @include last();
      .tag-wrapper {
        @include tag-wrapper();
      }
    }
  }
</style>
