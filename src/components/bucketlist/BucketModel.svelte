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
      <h2>Add Bucket</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>
      <div class="add-checkbox-wrapper">
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
      <h2>Edit note</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>
      <div class="shit-wrapper"></div>
      <div class="add-checkbox-wrapper">
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

<style lang="scss">
  @import "../styles/model.scss";
  .add-checkbox-wrapper {
    display: flex;
  }
  .add-checkbox-wrapper input {
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .add-checkbox-wrapper label {
    padding: 0.2em;
  }

  .add-checkbox-wrapper input:focus {
    color: #ccc;
  }
</style>
