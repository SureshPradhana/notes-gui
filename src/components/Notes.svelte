<script>
  // import {notes} from '../App.svelte';
  import { icons } from "feather-icons";
  import Modal from "./Modal.svelte";
  import { deleteNote, updateNote } from "../utils/db.js";
  import { notesStore } from "../stores.js";
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

<div class="notes">
  {#each notesProp as note (note._id)}
    <div class="note">
      <div class="time">
        <p><small>{new Date(note.date).toLocaleTimeString()}</small></p>
        <p><small>{new Date(note.date).toDateString()}</small></p>
      </div>
      <div>
        <p class="content">{note.content}</p>
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
</div>
{#if modalNote}
  <Modal
    {modalNote}
    {modalAction}
    {closeModal}
    handleAction={modalAction === "delete" ? handleDelete : handleEdit}
  />
{/if}

<style>
  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 5px;
  }

  .note {
    background-color: #242424;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin: 5px;
    display: grid;
    grid-template-rows: auto 2fr auto;
  }

  .time {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
  }
  .time p {
    margin: 0px;
    padding: auto;
    color: #ccc;
  }
  .content {
    font-size: 16px;
    text-align: left;
    font-family: monospace;
  }
  .tag {
    font-size: 12px;
    padding: 4px 10px;
    display: inline-block;
    background-color: #1a1a1a;
    font-weight: bold;
    margin: 0px 4px 0px 0px;
    border-radius: 4px;
    color: #ccc;
  }
  .last {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .tag-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  :global(.card) {
    padding: 4px;
    display: inline-block;
    background-color: #1a1a1a;
    font-weight: bold;
    border-radius: 2px;
  }

  :global(.edit) {
    color: #ccc;
    background: #393e41;
    border: 1px solid #393e41;
  }
  :global(.trash) {
    color: #9a3a31;
    background: transparent;
    border: 1px solid #9a3a31;
  }
  :global(.card:hover) {
    border: 1px solid #4c6676;
  }
</style>
