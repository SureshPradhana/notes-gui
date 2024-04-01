<script>
  import Dropdown from "../componenthub/Dropdown.svelte";
  import { flashCardsStore } from "../../stores.js";
  export let modalNote = null;
  export let modalAction = null;
  export let handleAction = () => {};
  export let closeModal = () => {};

  let localNote = null;
  let newtag = "";

  let tagsList = [];

  $: tagsList = [...new Set($flashCardsStore.flatMap((note) => note.tags))];

  $: filteredTags = tagsList.filter((tag) =>
    tag.toLowerCase().includes(newtag.toLowerCase()),
  );
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

  let selectedSuggestion = "";

  function selectSuggestion(suggestion) {
    selectedSuggestion = suggestion;
    newtag = suggestion;
  }

  function handleInput(event) {
    selectedSuggestion = "";
    newtag = event.target.value;
  }
</script>

<div class="modal">
  <div class="modal-content">
    {#if modalAction === "new"}
      <h2>Add Title</h2>
      <div class="info2">
        <textarea rows="10" cols="100" bind:value={localNote.title} autofocus
        ></textarea>
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
        <div>
          <input type="text" bind:value={newtag} on:input={handleInput} />
          {#if newtag}
            <Dropdown {filteredTags} {selectSuggestion} />
          {/if}
        </div>
        <button on:click={() => addTag(newtag)}>Add tag</button>
      </div>
      <div class="button-wrapper">
        <button on:click={closeModal}>Cancel</button>
        <button class="done" on:click={confirmAction}>Save</button>
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
        <textarea rows="10" cols="100" bind:value={localNote.title} autofocus
        ></textarea>
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
        <div>
          <input type="text" bind:value={newtag} on:input={handleInput} />
          {#if newtag}
            <Dropdown {filteredTags} {selectSuggestion} />
          {/if}
        </div>
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
