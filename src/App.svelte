<script>
	import { Router, Route, navigate } from "svelte-routing";
	import { onMount } from "svelte";
	import { jwtDecode } from "jwt-decode";

	import { userdetails, token ,message,loadingStatus} from "./stores.js";

	// routes
	import Home from "./components/home//Home.svelte";
	import Login from "./components/login/Login.svelte";
	import NotesRoute from "./components/notes/NotesRoute.svelte";
	import BucketList from "./components/bucketlist/BucketList.svelte";
	import FlashCards from "./components/flashcards/FlashCards.svelte";
	import NavBar from "./components/componenthub//NavBar.svelte";
	import MessagePopup from "./components/componenthub/MessagePopup.svelte";
	import Loading from "./components/componenthub/Loading.svelte";

	$:msg=$message;

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

		<div class="status">
			{#if $loadingStatus}
				<Loading />
			{/if}
		</div>

			{#if msg.message}
				<MessagePopup {msg} />
			{/if}
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
</style>
