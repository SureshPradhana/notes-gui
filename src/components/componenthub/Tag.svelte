<script>
	import { createEventDispatcher } from "svelte";
	export let localStore;
	export let selectedTag;

	const dispatch = createEventDispatcher();

	$: tags = [...new Set(localStore.flatMap((note) => note.tags))];
	function selectTag(tag) {
		selectedTag = tag;
		dispatch("selectedTag", selectedTag);
	}
</script>

<div>
	<div class="tag-container">
		<button
			on:click={() => selectTag("All")}
			class:selected={"All" === selectedTag}>All</button
		>
		{#each tags as tag (tag)}
			<button
				on:click={() => selectTag(tag)}
				class:selected={tag === selectedTag}
			>
				{tag}
			</button>
		{/each}
	</div>
</div>

<style>
	.tag-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	button.selected {
		background-color: #242424;

		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	button {
		font-size: 14px;
		padding: 4px 10px;
		display: inline-block;
		background-color: #1a1a1a;
		font-weight: bold;
		margin: 4px;
		border-radius: 2px;
		color: #ccc;
	}
</style>
