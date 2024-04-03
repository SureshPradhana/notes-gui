<script lang="ts">
	import Input from "../componenthub/Input.svelte";
	import Button from "../componenthub/Button.svelte";

	let email: string;
	export let sendmail = () => {};
</script>

<Input type="email" placeholder="email" bind:value={email} />
<Button on:click={sendmail}>sendmail</Button>

<style>
</style>
