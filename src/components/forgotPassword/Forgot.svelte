<script lang="ts">
	import ForgotForm from "./ForgotForm.svelte";
	import { navigate } from "svelte-routing";
	import { path } from "../../stores";
	let email: string;
	let pageStatus = "send mail";

	async function handleSendMail() {
		try {
			const response = await fetch(`${$path}/sendmail`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = await response.json();
			if (data.success) {
				pageStatus = "mail sent";
			}
		} catch (error) {
		} finally {
		}
	}
	function handleSubmit() {
		navigate("/resetpassword");
	}
</script>

<div class="forgot-password-form">
	{#if pageStatus === "send mail"}
		<h1>Forgot Password?</h1>
		<p>Enter your email linked to this account for password reset.</p>
		<div class="form">
			<ForgotForm {email} sendmail={handleSendMail} />
		</div>
	{/if}
	{#if pageStatus === "mail sent"}
		<h1>Mail Sent</h1>
		<p>Check your email for password reset link.</p>
		<p>enter the code sent to your email</p>
		<input type="text" placeholder="code" />
		<button on:click={handleSubmit}>submit</button>
	{/if}
</div>

<style lang="scss">
	.forgot-password-form {
		width: 400px;
		margin: 10px auto;
		background-color: var(--background-2);
		padding: 40px;
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
</style>
