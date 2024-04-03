<script>
	import Input from "../componenthub/Input.svelte";
	import Button from "../componenthub/Button.svelte";
	import Forgot from "../forgotPassword/Forgot.svelte";

	export let data = {};
	export let login = () => {};

	let errors = {};
	let touchedFields = {};

	const validate = () => {
		const errors = {};

		// Email validation using regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (touchedFields.email && !emailRegex.test(data.email)) {
			errors.email = "Invalid email address";
		}

		if (touchedFields.email && data.email === "") {
			errors.email = "Email is required";
		}

		// Password validation using regex
		const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
		if (touchedFields.password && !passwordRegex.test(data.password)) {
			errors.password =
				"Password should be at least 5 characters long and contain at least one lowercase letter and one digit";
		}

		if (touchedFields.password && data.password === "") {
			errors.password = "Password is required";
		}
		return errors;
	};

	const validateAndSubmit = () => {
		touchedFields = { email: true, password: true };
		errors = validate();
		if (!Object.keys(errors).length) {
			login(data);
		}
	};
</script>

<Input
	type="text"
	placeholder="email"
	bind:value={data.email}
	on:blur={() => (touchedFields.email = true)}
	error={errors.email}
/>
<Input
	type="password"
	placeholder="password"
	bind:value={data.password}
	on:blur={() => (touchedFields.password = true)}
	error={errors.password}
/>

<Button on:click={validateAndSubmit}>Login</Button>
<a class="forgot-link" href="/forgotpassword">forgot password?</a>

<style lang="scss">
	.forgot-link {
		margin: 2px 10px;
		color: var(--red);
		text-align: right;
	}
	.forgot-link:hover {
		color: var(--blue);
	}
</style>
