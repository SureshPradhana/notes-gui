<script>
    export let searchTerm = "";
</script>

<div>
    <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search notes by content"
    />
</div>

<style>
    input {
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #2b2a23;
    }
</style>
