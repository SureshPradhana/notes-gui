<script>
	import LoginForm from "./LoginForm.svelte";
	import SignupForm from "./SignupForm.svelte";
	import { navigate } from "svelte-routing";
	import { jwtDecode } from "jwt-decode";

	let pageswitch = "login";
	let logindata = { email: "", password: "" };
	let signupdata = { email: "", password: "", cpassword: "" };

	//stores
	import {
		path,
		token,
		userdetails,
		message,
		pageStatus,
		loadingStatus,
	} from "../../stores.js";

	function switchToLogin() {
		pageswitch = "login";
	}

	function switchToSignup() {
		pageswitch = "signup";
	}

	const resetLoginData = () => {
		logindata.password = "";
	};
	const resetSignupData = () => {
		signupdata.password = "";
		signupdata.email = "";
		signupdata.cpassword = "";
	};

	const handleLogin = async (data) => {
		try {
			const result = await login(data);
			if (result.success) {
				resetLoginData();
				navigate("/notes");

			

			} else {
				console.log("Login failed:", result);
				resetLoginData();
			}
		} catch (error) {
			console.error("Error occurred:", error);
		}
	};
	const handleSignup = async (data) => {
		try {
			let resultt = await signup(data);
			if (resultt.success) {
				resetSignupData();

			} else {
				console.log("signup failed:", resultt);
				resetSignupData();
			}
		} catch (error) {
			console.error("Error occurred:", error);
		}
	};

	async function login(logindata) {
		let success = false;
		$loadingStatus = true;
		let { email, password } = logindata;
		try {
			const response = await fetch(`${$path}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (data.token) {
				localStorage.setItem("token", data.token);
				token.set(data.token);
				const decodedToken = jwtDecode($token);
				userdetails.set(decodedToken.user);

				$pageStatus = "logedin";
				$message = {
					message: "Login successful!",
					type: "success",
				};
				$loadingStatus=false;
				success = true;
			} else {
				if ((data.message = "Invalid password")) {
					$message = {
						message: "email or password is wrong",
						type: "error",
					};
					$loadingStatus=false;
				} else {
					$message = {
						message: "login failed",
						type: "error",
					};
					$loadingStatus=false;
				}
				success = false;
			}
		} catch (error) {
			$message = { message: "user not found", type: "error" };
			$loadingStatus=false;
			success = false;
		} finally {
			$loadingStatus = false;
			setTimeout(() => {
				$message = { message: "", type: "" };
			}, 2000);
		}
		return { success };
	}

	async function signup(signupdata) {
		$loadingStatus = true;
		let success = false;
		let { email, password, cpassword } = signupdata;
		if (cpassword !== password) {
			console.log("Password does not match");
			return;
		} else {
			try {
				const response = await fetch(`${$path}/signup`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message);
				}

				const data = await response.json();

				console.log("Signup successful!");
				$pageStatus = "Signup successful!";
				$message = {
					message: "signup successful!",
					type: "success",
				};
				$loadingStatus=false;
				pageswitch = "login";
				success = true;
			} catch (error) {
				$message = { message: error, type: "success" };
				$loadingStatus=false;

				success = false;
			} finally {
				$loadingStatus = false;
				setTimeout(() => {
					$message = { message: "", type: "" };
				}, 2000);
			}
			return { success };
		}
	}
</script>

<div class="login-form">
	<h1>Login or Signup</h1>
	<div class="login-swicth">
		<button
			on:click={switchToLogin}
			class:active={pageswitch === "login"}
			class:highlight={pageswitch === "login"}
			class:dim={pageswitch !== "login"}>Login</button
		>
		<button
			on:click={switchToSignup}
			class:active={pageswitch === "signup"}
			class:highlight={pageswitch === "signup"}
			class:dim={pageswitch !== "signup"}>Signup</button
		>
	</div>
	<div class="form">
		{#if pageswitch == "login"}
			<LoginForm data={logindata} login={handleLogin} />
		{:else if pageswitch == "signup"}
			<SignupForm data={signupdata} signup={handleSignup} />
		{/if}
	</div>
</div>

<style lang="scss">
	.login-form {
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
				background-color:var(--green-2); 
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
