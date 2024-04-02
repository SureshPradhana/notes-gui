<script lang="ts">
	import { Router, Route, navigate } from "svelte-routing";
	import { onMount } from "svelte";
	import { jwtDecode } from "jwt-decode";

	import {
		userdetails,
		token,
		message,
		loadingStatus,
		themeStore,
	} from "./stores";

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

	$: msg = $message;

	onMount(() => {
		let tokenfromlocal: string | null =
			localStorage.getItem("token");
		if (tokenfromlocal) {
			token.set(tokenfromlocal);
			const decodedToken: any = jwtDecode(tokenfromlocal);
			userdetails.set(decodedToken.user);
		} else {
			navigate("/");
		}
	});

	function toggleTheme() {
		themeStore.update((theme) => {
			const newTheme = theme === "dark" ? "light" : "dark";
			localStorage.setItem("theme", newTheme);
			document.documentElement.setAttribute(
				"data-theme",
				newTheme,
			);
			return newTheme;
		});
	}

	$: {
		const savedTheme = localStorage.getItem("theme") || "light";
		document.documentElement.setAttribute("data-theme", savedTheme);
		themeStore.set(savedTheme);
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

<style lang="scss">
	.main-container {
		display: flex;
		flex-direction: row;
	}
	.theme {
		z-index: 99999;
		position: absolute;
		right: 0;
		color: red;
		max-width: fit-content;
	}
</style>
