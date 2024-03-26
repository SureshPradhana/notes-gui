<script>
	export let type = "text";
	export let value = type === "text" ? "" : null;
	export let error = "";
	export let label = "";
	export let placeholder = "";

	function handleInput({ target: t }) {
		if (type === "number") {
			value = t.value === "" ? null : t.valueAsNumber;
		} else {
			value = t.value;
		}
	}
</script>

<label class="block label">
	{#if label}
		<span class="block">{label}</span>
	{/if}
	<input
		class="input"
		class:error
		{type}
		{placeholder}
		{value}
		on:input={handleInput}
		on:input
		on:blur
	/>
	{#if error}
		<span class="block error-text">{error}</span>
	{/if}
</label>

<style>
	.label {
		margin: 10px;
	}
	.block {
		display: block;
	}
	.input {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
	}
	.error {
		border-color: #f55;
	}

	.error-text {
		color: #f55;
		text-align: left;
	}
</style>
