<script>
	import Input from "./Input.svelte";
	import Button from "./Button.svelte";

	export let data = {};
	export let signup = () => {};


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

		if (touchedFields.cpassword && !passwordRegex.test(data.cpassword)) {
			errors.cpassword =
				"Password should be at least 5 characters long and contain at least one lowercase letter and one digit";
		}

		if (touchedFields.cpassword && data.cpassword === "") {
			errors.cpassword = "Please confirm the password";
		}
		if (
			touchedFields.cpassword &&
			data.password !== "" &&
			data.cpassword !== "" &&
			data.cpassword !== data.password
		) {
			errors.cpassword = "Password doesn't match";
		}

		return errors;
	};

	const validateAndSubmit = () => {
		touchedFields = { email: true, password: true, cpassword: true };
		errors=validate()
		if (!Object.keys(errors).length) {
			signup(data);
		}
	};
</script>

<div class="form">
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
	<Input
		type="password"
		placeholder="confirm password"
		bind:value={data.cpassword}
		on:blur={() => (touchedFields.cpassword = true)}
		error={errors.cpassword}
	/>

	<Button on:click={validateAndSubmit}>Signup</Button>
</div>

<style>
	.form {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>
