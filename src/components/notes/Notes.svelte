<script>
  // import {notes} from '../App.svelte';
  import { icons } from "feather-icons";
  import Modal from "./Modal.svelte";
  import { deleteNote, updateNote } from "../../utils/db.js";
  import { notesStore } from "../../stores.js";
  import Markdown from "@magidoc/plugin-svelte-marked";
  export let notesProp;

  let modalNote = null;
  let modalAction = null;

  async function handleDelete(note) {
    // Delete the note
    let res = await deleteNote(note._id);
    if (res) {
      notesStore.update((n) => n.filter((n) => n._id !== note._id));
    }
    modalNote = null;
  }

  async function handleEdit(note) {
    // Edit the note

    let res = await updateNote(note);
    if (res) {
      notesStore.update((n) => n.map((n) => (n._id === note._id ? note : n)));
    }

    modalNote = null;
  }

  function openModal(note, action) {
    modalNote = note;
    modalAction = action;
  }

  function closeModal() {
    modalNote = null;
    modalAction = null;
  }
</script>

{#each notesProp as note (note._id)}
  <div class="note">
    <div class="time">
      <p><small>{new Date(note.date).toLocaleTimeString()}</small></p>
      <p><small>{new Date(note.date).toDateString()}</small></p>
    </div>
    <div class="details">
      <div>
        <Markdown source={note.content} />
      </div>
    </div>
    <div class="last">
      <div class="tag-wrapper">
        {#if note.tags.length > 0}
          {#each note.tags as tag (tag)}
            <p class="tag">{tag}</p>
          {/each}
        {:else}
          <p class="tag">No tags</p>
        {/if}
      </div>
      <div class="edit-wrapper">
        <button on:click={() => openModal(note, "edit")}>
          {@html icons["edit-2"].toSvg({
            class: "feather card edit",
            width: "14px",
            height: "14px",
          })}
        </button>
        <button on:click={() => openModal(note, "delete")}>
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
  <Modal
    {modalNote}
    {modalAction}
    {closeModal}
    handleAction={modalAction === "delete" ? handleDelete : handleEdit}
  />
{/if}

<style lang="scss">
  @import "../styles/mixins.scss";
  .note {
    @include bucket();
    .time {
      @include time();
      p {
        @include time_i();
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
