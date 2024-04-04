<script lang="ts">
	import Input from "../componenthub/Input.svelte";
	import Button from "../componenthub/Button.svelte";
	import { createEventDispatcher } from "svelte";

	export let email: string;
	export let sendmail = (email: string) => {};
	const dispatch = createEventDispatcher();
	// Function to dispatch the sendmail event with email value
	function dispatchSendmail() {
		dispatch("sendmail", { email });
	}
</script>

<Input type="email" placeholder="email" bind:value={email} />
<Button on:click={dispatchSendmail}>sendmail</Button>

<style>
</style>
