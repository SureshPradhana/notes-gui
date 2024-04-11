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
		width: 50px;
		height: 20px;
		border-radius: 50px;
		border: 2px solid var(--toggle-border);
		display: flex;
		position: relative;
		cursor: pointer;
		box-sizing: border-box;
	}

	.toggle-input {
		display: none;
	}

	.toggle-switch {
		width: 20px;
		height: 100%;
		background: var(--toggle-switch-bg);
		border-radius: 50px;
		position: absolute;
		left: 0%;
		top: 0;
		transition: 0.5s;
	}

	.toggle-input:checked + .toggle-switch {
		left: 100%;
		transform: translateX(-85%);
	}
</style>
