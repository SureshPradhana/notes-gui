<script>
	export let toggleTheme = () => {};
</script>

<label for="toggle">
	<input
		type="checkbox"
		id="toggle"
		class="toggle-input"
		on:click={toggleTheme}
	/>
	<div class="toggle-switch"></div>
</label>

<style lang="scss">
	label {
		background: var(--toggle-bg);
		width: 60px;
		height: 25px;
		border-radius: 50px;
		border: 2px solid var(--toggle-border);
		display: flex;
		position: relative;
		cursor: pointer;
	}

	.toggle-input {
		display: none;
	}

	.toggle-switch {
		width: 20px;
		height: 15px;
		margin: 0.4em;
		margin-bottom: 0.3em;
		margin-top: 0.3em;
		background: var(--toggle-switch-bg);
		border-radius: 50px;
		position: absolute;
		left: 0;
		top: 0;
		transition: 0.5s;
	}

	.toggle-input:checked + .toggle-switch {
		left: 85%;
		transform: translateX(-85%);
	}
</style>
