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
		width: -webkit-fill-available;
		position: absolute;
		left: 0;
		background: var(--black-2);
		color: white;
		height: min-content;
		max-height: 200px;
		overflow: scroll;

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
