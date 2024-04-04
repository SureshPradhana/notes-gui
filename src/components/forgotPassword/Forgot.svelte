<script lang="ts">
	import ForgotForm from "./ForgotForm.svelte";
	import { path } from "../../stores";
	let emails: string;
	let pageStatus = "send mail";
	let error = "";

	async function handleSendMail(event) {
		// Call your sendmail logic here, using the email value
		const { email } = event.detail;
		// Call your sendmail logic here, using the email value
		try {
			const response = await fetch(`${$path}/api/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = await response.json();
			if (response.status == 200) {
				pageStatus = "mail sent";
			}
			if (response.status == 404 && data.message == "User not found") {
				error = data.message;
			}
		} catch (error) {
		} finally {
		}
	}
</script>

<div class="forgot-password-form">
	{#if pageStatus === "send mail"}
		<h1>Forgot Password?</h1>
		<p>Enter your email linked to this account for password reset.</p>
		<div class="form">
			<ForgotForm email={emails} on:sendmail={handleSendMail} />
			{#if error}
				<p style="color: red;">
					Account with this email was not found.
				</p>
			{/if}
		</div>
	{/if}
	{#if pageStatus === "mail sent"}
		<h1>Mail Sent</h1>
		<p>Check your email for password reset link.</p>
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
		.login-swicth {
			display: flex;
			justify-content: center;
			button {
				padding: 10px;
				margin: 10px;
				border-radius: 5px;
				border: 1px solid var(--white-2);
				background-color: var(--black-2);
				color: var(--white);
			}
			.active {
				background-color: var(--green-2);
				color: var(--background-color);
			}

			.highlight {
				border: 2px solid var(--black);
				pointer-events: none;
			}

			.dim {
				opacity: 0.5;
				cursor: pointer;
			}
		}
		.form {
			display: flex;
			justify-content: center;
			flex-direction: column;
		}
	}

	.reset-password-message {
		background-color: var(--red-2); /* Light red background */
		color: white; /* Dark red text */
		border: 1px solid #f5c6cb; /* Border color */
		border-radius: 5px; /* Rounded corners */
		margin: 0px;
	}
	.reset-password-message p {
		margin: 0px;
	}
</style>
