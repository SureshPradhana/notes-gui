<button type="button" class="button" on:click>
	<slot />
</button>

<style>	
    .button {
	padding: 10px;
	margin: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #1a1a1a;
	color: #ccc;
    }
</style>
