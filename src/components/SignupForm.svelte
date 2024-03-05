<script>
	import Input from './Input.svelte';
	import Button from './Button.svelte';
	
	export let data = {};
	export let signup = () => {};

	let email = data.email ?? '';
	let password= data.password ?? '';
	let cpassword=data.cpassword ?? '';
	let errors = {};
	let touchedFields = {};
	
	$: result = {
		email, password,cpassword
	};
	
	$: errors = validate(touchedFields, result);

	const validate = () => {
    const errors = {};

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touchedFields.email && !emailRegex.test(email)) {
        errors.email = 'Invalid email address';
    }

    if (touchedFields.email && email === '') {
        errors.email = 'Email is required';
    }

    // Password validation using regex
	  const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
    if (touchedFields.password && !passwordRegex.test(password)) {
        errors.password = 'Password should be at least 5 characters long and contain at least one lowercase letter and one digit';
    }

		if (touchedFields.password && password === '') {
        errors.password = 'Password is required';
    }
	
    if (touchedFields.cpassword && !passwordRegex.test(cpassword)) {
        errors.cpassword = 'Password should be at least 5 characters long and contain at least one lowercase letter and one digit';
    }

		if (touchedFields.cpassword && cpassword === '') {
        errors.cpassword = 'Please confirm the password';
    }
	if (touchedFields.cpassword && password !=='' && cpassword !=='' &&  cpassword !==password ) {
        errors.cpassword = 'Password doesn\'t match';
    }
		
    return errors;
};
	
	const validateAndSubmit = () => {
		touchedFields = { email: true, password:true ,cpassword:true} ;
        console.log(result)
		if (!Object.keys(errors).length) {
			signup(result);
		}
	};
</script>

<div class="form">
		<Input
			type="text"
			placeholder="email"
			bind:value={email}
			on:blur={() => touchedFields.email = true}
			error={errors.email}
		/>
		<Input
			type="password"
		  placeholder="password"
			bind:value={password}
			on:blur={() => touchedFields.password = true}
			error={errors.password}
		/>
		<Input
			type="password"
		  placeholder="confirm password"
			bind:value={cpassword}
			on:blur={() => touchedFields.cpassword = true}
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
