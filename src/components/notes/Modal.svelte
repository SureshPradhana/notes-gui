<script>
  export let modalNote = null;
  export let modalAction = null;
  export let handleAction = () => {};
  export let closeModal = () => {};
  import { notesStore } from "../../stores.js";

  let localNote = null;
  let newtag = "";
  let tagsList = [];

  $: tagsList = [...new Set($notesStore.flatMap((note) => note.tags))];

  $: filteredTags = tagsList.filter((tag) =>
    tag.toLowerCase().includes(newtag.toLowerCase()),
  );

  function confirmAction() {
    handleAction(localNote);

    closeModal();
  }

  $: localNote = modalNote ? modalNote : { content: "", tags: [] };

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
      <h2>Add note</h2>
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
          <div class="dropdown">
            {#if newtag}
              <ul>
                {#each filteredTags as tag}
                  <li on:click={() => selectSuggestion(tag)}>
                    {tag}
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>

        <button on:click={() => addTag(newtag)}>Add tag</button>
      </div>

      <div class="button-wrapper">
        <button on:click={closeModal}>Cancel</button>
        <button class="done" on:click={confirmAction}>Save</button>
      </div>
    {:else if modalAction === "edit"}
      <h2>Edit note</h2>
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
  .add-tag-wrapper input {
    width: 100%;
  }
  .add-tag-wrapper {
    position: relative;
  }
  .add-tag-wrapper div {
    position: relative;
  }

  .add-tag-wrapper div .dropdown {
    width: -webkit-fill-available;
    position: absolute;
    left: 0;
    background: var(--black-2);
    color: white;
    height: min-content;
    max-height: 200px;
    overflow: scroll;
  }
  .dropdown {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ccc; /* Border style */
      max-height: 200px; /* Optional: Limit maximum height */
      overflow-y: auto; /* Optional: Add scrollbar if content exceeds height */
    }

    /* Style for <li> elements inside the <ul> */
    ul li {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #ccc; /* Optional: Add bottom border between list items */
    }

    /* Style for the last <li> to remove bottom border */
    ul li:last-child {
      border-bottom: none; /* Remove bottom border for the last item */
    }
  }
</style>
