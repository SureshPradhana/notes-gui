<script lang="ts">
	import { Router, Route, navigate } from "svelte-routing";
	import { onMount } from "svelte";
	import { jwtDecode } from "jwt-decode";

	import { userdetails, token, message, loadingStatus, path } from "./stores";

	// routes
	import Home from "./components/home//Home.svelte";
	import Login from "./components/login/Login.svelte";
	import NotesRoute from "./components/notes/NotesRoute.svelte";
	import BucketList from "./components/bucketlist/BucketList.svelte";
	import FlashCards from "./components/flashcards/FlashCards.svelte";
	import NavBar from "./components/componenthub//NavBar.svelte";
	import MessagePopup from "./components/componenthub/MessagePopup.svelte";
	import Loading from "./components/componenthub/Loading.svelte";
	import ToggleSwitch from "./components/componenthub/ToggleSwitch.svelte";
	import Forgot from "./components/forgotPassword/Forgot.svelte";
	import Reset from "./components/resetPassword/Reset.svelte";
	$: msg = $message;

	function themeLoadOnStart() {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
			document.documentElement.classList.remove("dark");
		}
	}

	onMount(() => {
		themeLoadOnStart();
		let tokenfromlocal: string | null = localStorage.getItem("token");
		const currentPath = window.location.pathname;
		if (tokenfromlocal) {
			token.set(tokenfromlocal);
			try {
				(async () => {
					const response = await fetch(
						`${$path}/api/validate-token`,
						{
							headers: {
								Authorization: $token,
							},
						},
					);
					if (response.ok) {
						const data = await response.json();
						token.set(tokenfromlocal);
						userdetails.set(data.user); // Assuming the API returns user details
					} else {
						throw new Error("Token validation failed");
					}
				})();
			} catch (error) {
				console.error("Error occurred:", error);
				localStorage.removeItem("token");
				token.set("");
				userdetails.set({});
				if (
					currentPath !== "/forgotpassword" &&
					currentPath !== "/reset-password"
				) {
					navigate("/");
				}
			}
		} else if (
			currentPath == "/forgotpassword" ||
			currentPath == "/reset-password"
		) {
			console.log("no need to check token");
		} else {
			navigate("/");
		}
	});

	function toggleTheme() {
		const currentTheme = localStorage.getItem("theme") || "light";
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);

		document.documentElement.classList.toggle("dark", newTheme === "dark");
		document.documentElement.classList.toggle(
			"light",
			newTheme === "light",
		);
	}
</script>

<div class="status">
	{#if $loadingStatus}
		<Loading />
	{/if}
</div>

{#if msg.message}
	<MessagePopup {msg} />
{/if}
<div class="theme">
	<ToggleSwitch {toggleTheme} />
</div>
<Router>
	<Route path="/">
		<Home />
	</Route>

	<Route path="/login">
		<Login />
	</Route>
	<Route path="/forgotpassword">
		<Forgot />
	</Route>
	<Route path="/reset-password">
		<Reset />
	</Route>
	<Route path="/notes">
		<div class="main-container">
			<NavBar />
			<NotesRoute />
		</div>
	</Route>

	<Route path="/bucketlist">
		<div class="main-container">
			<NavBar />
			<BucketList />
		</div>
	</Route>

	<Route path="/flashcards">
		<div class="main-container">
			<NavBar />
			<FlashCards />
		</div>
	</Route>
</Router>

<style gloabl lang="postcss">
	@tailwind utilities;
	@tailwind components;
	@tailwind base;
	.main-container {
		display: flex;
		flex-direction: row;
	}
	.theme {
		z-index: 1000;
		position: absolute;
		right: 0.5%;
		margin: 0.2em;
		color: red;
		max-width: fit-content;
	}
</style>
