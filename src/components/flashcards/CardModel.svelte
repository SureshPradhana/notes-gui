<script>
  export let modalNote = null;
  export let modalAction = null;
  export let handleAction = () => {};
  export let closeModal = () => {};

  let localNote = null;
  let newtag = "";

  function confirmAction() {
    handleAction(localNote);

    closeModal();
  }

  $: localNote = modalNote ? modalNote : { content: "", title: "", tags: [] };

  function removeTag(index) {
    if (localNote) {
      localNote.tags = localNote.tags.filter((_, i) => i !== index);
    }
  }

  function addTag(tag) {
    if (localNote) {
      localNote.tags = [...localNote.tags, tag.trim()];
      newtag = "";
    }
  }
</script>

<div class="modal">
  <div class="modal-content">
    {#if modalAction === "new"}
      <h2>Add Title</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.title}></textarea>
      </div>
      <h2>Add Card</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>
      <div class="shit-wrapper">
        {#if localNote.tags.length > 0}
          {#each localNote.tags as tag, index (tag)}
            <p>
              {tag}
              <button class="delete" on:click={() => removeTag(index)}>X</button
              >
            </p>
          {/each}
        {:else}
          <p>No tags</p>
        {/if}
      </div>
      <div class="add-tag-wrapper">
        <input type="text" placeholder="Add tag" bind:value={newtag} />
        <button on:click={() => addTag(newtag)}>Add tag</button>
      </div>
      <div class="button-wrapper">
        <button on:click={closeModal}>Cancel</button>
        <!-- Call closeModal when clicked -->
        <button class="done" on:click={confirmAction}>Add</button>
      </div>
    {:else if modalAction === "delete"}
      <div class="info">
        <h2>Are you sure you want to {modalAction} this Card?</h2>
      </div>
      <div class="button-wrapper">
        <button on:click={closeModal}>No</button>
        <!-- Call closeModal when clicked -->
        <button class="done" on:click={confirmAction}>Yes</button>
      </div>
    {:else if modalAction === "edit"}
      <h2>Edit note</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.title}></textarea>
      </div>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.content}
        ></textarea>
      </div>

      <div class="shit-wrapper">
        {#if localNote.tags.length > 0}
          {#each localNote.tags as tag, index (tag)}
            <p>
              {tag}
              <button class="delete" on:click={() => removeTag(index)}>X</button
              >
            </p>
          {/each}
        {:else}
          <p>No tags</p>
        {/if}
      </div>
      <div class="add-tag-wrapper">
        <input type="text" placeholder="Add tag" bind:value={newtag} />
        <button on:click={() => addTag(newtag)}>Add tag</button>
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
</style>
