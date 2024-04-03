<script>
	export let filteredTags;
	export let selectSuggestion;

	function callselectSuggestion(suggestion) {
		selectSuggestion(suggestion);
	}
</script>

<div class="dropdown">
	<ul>
		{#each filteredTags as tag}
			<li on:click={() => callselectSuggestion(tag)}>
				{tag}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.dropdown {
		color: white;
		overflow-x: scroll;
		width: 100%;
		white-space: nowrap;
		padding: 10px;

		ul {
			list-style: none;
			display: inline-block;
			padding: 0;
			margin: 0;
		}

		/* Style for <li> elements inside the <ul> */
		ul li {
			display: inline-block;
			margin: 0.2em;
			padding: 0.2em 0.4em;
			cursor: pointer;
			background: var(--tag-background);
			color: var(--text-color);
		}

		/* Style for the last <li> to remove bottom border */
		ul li:last-child {
			border-bottom: none; /* Remove bottom border for the last item */
		}
	}
</style>
