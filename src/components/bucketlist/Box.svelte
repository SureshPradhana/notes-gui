<script>
  import { icons } from "feather-icons";

  import {bucketsStore} from "../../stores.js";
    import { deleteBucket,updateBucket } from "../../utils/db.js";
    import BucketModel from "../BucketModel.svelte";
  export let notesProp;

  let modalNote = null;
  let modalAction = null;

  
  function openModal(bucket,action){
    modalNote = bucket;
    modalAction=action;

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
        <input type="checkbox" bind:checked={bucket.completed} on:change={()=>updateBucket(bucket)} />
      </label>
    </div>
    <div class="last">
      <div class="tag-wrapper">
      
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
  {/each}

  {#if modalNote}
  <BucketModel
    {modalNote}
    {modalAction}
    {closeModal}
    handleAction={modalAction === "delete" ? handleDelete : handleEdit}
  />
{/if}
  


  <style>
     .bucket {
    background-color: #242424;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin: 10px;
    display: grid;
    grid-template-rows: auto 2fr auto;
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
  :global(.green) {
    color: forestgreen;
  }
  .content-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tag-wrapper label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #888787;
    margin: 0px 4px 0px 0px;
  }

  
  </style>