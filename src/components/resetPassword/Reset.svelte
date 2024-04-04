<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { resetPassword } from "../../utils/db";

	let token = ""; // Initialize token state
	let password = ""; // Initialize password state
	let confirmPassword = ""; // Initialize confirmPassword state
	let errorMessage = ""; // Initialize errorMessage state

	// Extract token from the URL when the component mounts
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		token = urlParams.get("token");
	});

	// Function to handle form submission
	async function handleSubmit(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			errorMessage = "Passwords do not match";
			return;
		}

		try {
			let re = await resetPassword(token, password);
			// Reset successful, redirect to login page or home page
			if (re.message === "Password has been successfully reset") {
				navigate("/login");
			}
		} catch (error) {
			errorMessage = error.message; // Display error message
		}
	}
</script>

<div class="forgot-password-form">
	<h1>Reset Password</h1>

	<form on:submit={handleSubmit}>
		<label for="password">New Password:</label>
		<input type="password" id="password" bind:value={password} required />
		<br />

		<label for="confirmPassword">Confirm New Password:</label>
		<input
			type="password"
			id="confirmPassword"
			bind:value={confirmPassword}
			required
		/>
		<br />

		<button type="submit">Reset Password</button>
	</form>
	{#if errorMessage}
		<p style="color: red;">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	.forgot-password-form {
		width: 400px;
		margin: 10px auto;
		background-color: var(--background-2);
		padding: 40px;
		p {
			margin: 10px;
		}
		h1 {
			text-align: center;
			font-size: 24px;
		}
		form {
			display: flex;
			justify-content: center;
			flex-direction: column;
			margin: 10px;

			input {
				padding: 10px;
			}
			Button {
				padding: 10px;
				border-radius: 5px;
				border: 1px solid var(--ccc);
				background-color: #1a1a1a;
				color: var(--ccc);
			}
		}
	}
</style>
