<script>
  export let modalNote = null;
  export let modalAction = null;
  export let handleAction = () => {};
  export let closeModal = () => {};

  let localNote = null;
  // let completed = false;

  function confirmAction() {
    handleAction(localNote);

    closeModal();
  }

  $: localNote = modalNote ? modalNote : { content: "", completed: false };
</script>

Card
<div class="modal">
  <div class="modal-content">
    {#if modalAction === "new"}
      <div class="info2">
        <h2>Add Bucket</h2>
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>
      <div class="add-tag-wrapper">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          bind:checked={localNote.completed}
        />
        <label for="completed">completed</label>
      </div>
      <div class="button-wrapper">
        <button on:click={closeModal}>Cancel</button>
        <!-- Call closeModal when clicked -->
        <button class="done" on:click={confirmAction}>Add</button>
      </div>
    {:else if modalAction === "delete"}
      <div class="info">
        <h2>Are you sure you want to {modalAction} this note?</h2>
      </div>
      <div class="button-wrapper">
        <button on:click={closeModal}>No</button>
        <!-- Call closeModal when clicked -->
        <button class="done" on:click={confirmAction}>Yes</button>
      </div>
    {:else if modalAction === "edit"}
      <div class="info2">
        <h2>Edit note</h2>
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>
      <div class="shit-wrapper"></div>
      <div class="add-tag-wrapper">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          bind:checked={localNote.completed}
        />
        <label for="completed">completed</label>
      </div>

      <div class="button-wrapper">
        <button on:click={closeModal}>Cancel</button>
        <button class="done" on:click={confirmAction}>Save</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .modal {
    background-color: rgba(57, 57, 57, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .modal-content {
    background-color: #222222;
    width: 60%;
    height: 60%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .button-wrapper {
    display: flex;
    justify-content: end;
  }
  .button-wrapper button {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #1a1a1a;
    color: #ccc;
  }
  .add-tag-wrapper {
    display: flex;
    justify-content: left;
    /* align-content: stretch; */
  }
  .add-tag-wrapper input {
    width: 60%;
    padding: 12px;
    /* margin: 10px; */
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .add-tag-wrapper button {
    background-color: #1a1a1a;
    padding: 12px;
    border-radius: 5px;
  }

  .add-tag-wrapper input:focus {
    color: #ccc;
  }

  .button-wrapper .done {
    background-color: #3f6d41;
    color: #ccc;
  }
  .info2 textarea {
    width: 100%;
  }
  .shit-wrapper {
    display: flex;
  }
  .shit-wrapper p {
    background-color: #1a1a1a;
    border-radius: 4px;
    margin-right: 4px;
    padding: 8px;
  }
  .shit-wrapper p button {
    margin: 0;
    padding: 0;
    border: none;
  }
  .shit-wrapper p button:hover {
    color: #9a3a31;
    border: none;
  }

  @media (min-width: 768px) {
    .modal-content {
      width: 45%;
    }
  }
</style>
