<script>
	import { icons } from "feather-icons";

	import { Router, Route, Link, navigate } from "svelte-routing";

	import { onMount } from "svelte";
	import { userdetails, token, path, loading } from "./stores.js";
	import { jwtDecode } from "jwt-decode";
	// routes
	import Home from "./components/Home.svelte";
	import Login from "./components/Login.svelte";
	import NotesRoute from "./components/NotesRoute.svelte";
	import BucketList from "./components/BucketList.svelte";
	import FlashCards from "./components/FlashCards.svelte";

	import NavBar from "./components/NavBar.svelte";

	onMount(() => {
		let tokenfromlocal = localStorage.getItem("token");
		token.set(tokenfromlocal);
		if (tokenfromlocal) {
			const decodedToken = jwtDecode(tokenfromlocal);
			userdetails.set(decodedToken.user);
		} else {
			navigate("/");
		}
	});
</script>

<Router>
	<Route path="/">
		<!-- make a component -->
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
	.header {
		background-color: #2a2a2a;
		text-align: center;
		position: relative;
		height: 60px;
	}
	.header h1 {
		margin: 0;
		padding: 10px;
	}
	:global(.header .add) {
		height: auto;
		position: absolute;
		right: 10%;
		top: 50%;
		transform: translateY(-20%);
		background-color: transparent;
		border: none;
		margin: none;
		padding: none;
	}
	:global(.menu) {
		background-color: transparent;
	}
	:global(.header .user-profile) {
		height: auto;
		position: absolute;
		left: 10%;
		top: 50%;
		transform: translateY(-20%);
		background-color: transparent;
		border: none;
		margin: none;
		padding: none;
	}

	.tag-wrapper {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.search {
		display: flex;
		justify-content: center;
	}

	.active {
		background-color: #72d86a;
		color: #2a2a2a;
	}

	.highlight {
		border: 2px solid black;
		pointer-events: none;
	}

	.dim {
		opacity: 0.5;
		cursor: pointer;
	}
	.login-swicth {
		display: flex;
		justify-content: center;
	}
	.login-swicth button {
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #1a1a1a;
		color: #ccc;
	}

	.login-form {
		width: 400px;
		margin: 10px auto;
		background-color: #242424;
		padding: 40px;
	}
	.login-form h1 {
		text-align: center;
		font-size: 24px;
	}
	input {
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
	}
	header {
		background-color: #2a2a2a;
		text-align: right;
		position: relative;
		margin: 10px;
		height: 40px;
	}
	:global(header a) {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
		padding: 5px;
		background-color: #393e41;
		border: 1px solid #393e41;
	}
	:global(header a:hover) {
		border: 1px solid #466676;
		color: rgba(255, 255, 255, 0.7);
	}

	.menu {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		transform: translateX(100%);
		transition: transform 0.3s ease-out;
	}

	.menu.open {
		transform: translateX(0);
	}
</style>
