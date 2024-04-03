<script>
    export let searchTerm = "";
</script>

<input
    type="text"
    bind:value={searchTerm}
    placeholder="Search notes by content"
/>

<style>
    input {
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid var(--ccc);
        background-color: var(--search-background);
    }
</style>
