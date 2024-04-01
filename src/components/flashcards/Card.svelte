<script>
  import { icons } from "feather-icons";
  import Accordion from "../componenthub/Accordion.svelte";

  import { flashCardsStore } from "../../stores";
  import { deleteCard, updateCard } from "../../utils/db";
  import FlashCardModel from "./CardModel.svelte";
  export let cardsProp;
  import Markdown from "@magidoc/plugin-svelte-marked";

  let modalNote = null;
  let modalAction = null;

  function openModal(bucket, action) {
    modalNote = bucket;
    modalAction = action;
  }
  async function handleDelete(note) {
    // Delete the note

    let res = await deleteCard(note._id);
    if (res) {
      flashCardsStore.update((n) => n.filter((n) => n._id !== note._id));
    }
    modalNote = null;
  }

  async function handleEdit(note) {
    // Edit the note

    let res = await updateCard(note);
    if (res) {
      flashCardsStore.update((n) =>
        n.map((n) => (n._id === note._id ? note : n)),
      );
    }

    modalNote = null;
  }

  function closeModal() {
    modalNote = null;
    modalAction = null;
  }
</script>

{#each cardsProp as bucket (bucket._id)}
  <div class="bucket">
    <Accordion>
      <span slot="head"> {bucket.title} </span>
      <div slot="details">
        <Markdown source={bucket.content} />

        <div class="last">
          <div class="tag-wrapper">
            {#if bucket.tags.length > 0}
              {#each bucket.tags as tag (tag)}
                <p class="tag">{tag}</p>
              {/each}
            {:else}
              <p class="tag">No tags</p>
            {/if}
          </div>

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
    </Accordion>
  </div>
{/each}

{#if modalNote}
  <FlashCardModel
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
      .content {
        @include content();
      }
    }
    .last {
      @include last();
      .tag-wrapper {
        @include tag-wrapper();
        .tag {
          @include tag();
        }
      }
    }
  }
</style>
