<script>
	import { icons } from "feather-icons";

	import Notes from "./components/Notes.svelte";
	import Tag from "./components/Tag.svelte";
	import Search from "./components/Search.svelte";
	import Modal from "./components/Modal.svelte";
	import UserProfile from "./components/UserProfile.svelte";
	import LoginForm from './components/LoginForm.svelte';
	import SignupForm from './components/SignupForm.svelte';
	import Loading from './components/Loading.svelte';
	import MessagePopup from './components/MessagePopup.svelte';

	import { jwtDecode } from "jwt-decode";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";

	import { addNote, getNote, updateNote } from "./utils/db.js";
	let loadingStatus = false;
	let message = '';
	//stores
	import {
		notesStore,
		selectedTag,
		searchTerm,
		selectedDate,
		loading,
		token,
		user,
		userdetails,
	} from "./stores.js";
	var path = 'https://notes-api-3xdk.onrender.com'
	let modalNote = null;
	let modalAction = null;
	let userModal = false;
	let pageStatus = "home";

	const updateNotes = (data) => {
		notesStore.set(data);
	};

	const updateLoading = (data) => {
		loading.set(data);
	};

	let status = "";
	let pageswitch = "login";
	let logindata={ email: '', password:'' };
	let signupdata={ email:'',password:'',cpassword:''};
	async function login(logindata) {
		loadingStatus= true;
		let {email,password}=logindata;	
		try{
		const response = await fetch(`${path}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		localStorage.setItem("token", data.token);
		token.set(data.token);
		logindata={email:'',password:''};
		pageStatus = "logedin";
		message ="Login successful!";
		
		}catch(error){
		message="User not found";
		} finally{
		 loadingStatus =false;
		 setTimeout(() => {
        message = '';
      }, 2000);
		}
		
	
	}

	async function signup(signupdata) {
		loadingStatus= true;
		let {email,password,cpassword}=signupdata
		if (cpassword !== password) {
			console.log("Password does not match");
			return;
		} else {
			try {
				console.log("Hello");
				const response = await fetch(`${path}/signup`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});
				console.log("Hello", response);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message);
				}

				const data = await response.json();
					console.log(data);
					console.log("Signup successful!");
					status = "Signup successful!";
					signupdata.email = '';
            signupdata.password = '';
            signupdata.cpassword = '';
					message="signed up successful";
					pageswitch="login";

				} catch (error) {
					message="signup fail";
	signupdata.email = '';
            signupdata.password = '';
            signupdata.cpassword = '';
					console.error("Error signing up:", error);
			}
			finally{
				loadingStatus =false;
		 setTimeout(() => {
        message = '';
      }, 2000);

			}
		}
	}

	async function signout() {
		localStorage.removeItem("token");
		token.set("");
		pageStatus = "home";
		closeModal()
	}

	$: {
		if ($token) {
			const decodedToken = jwtDecode($token);
			userdetails.set(decodedToken.user);
			try {
				(async () => {
					// Wrap the async function properly
					
					const response = await fetch(`${path}/api/notes`, {
						headers: { Authorization: $token },
					});
					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();
					updateNotes(data);
					updateLoading(false);
				})(); // Call the async function immediately
			} catch (error) {
				loading.set(true);
			}
		} else {
			notesStore.set([]);
			loading.set(false);
		}
	}

	// Add note
	async function handleAction(note) {
		let res = await addNote(note);
		let newNote = await getNote(res.insertedId);
		if (newNote) {
			notesStore.update((notes) => {
				return [newNote, ...notes];
			});
		}
		modalNote = null;
		modalAction = null;
	}

	function openModal(note, action) {
		modalNote = note;
		modalAction = action;
	}

	function openUserModal() {
		console.log("User Modal");
		userModal = true;
	}

	function closeModal() {
		modalNote = null;
		modalAction = null;

		userModal = false;
	}

	// Filtering notes by tag
	let filteredNotesByTag = derived(
		[notesStore, selectedTag],
		([$notesStore, $selectedTag]) =>
			$selectedTag !== "All" && $selectedTag
				? $notesStore.filter((note) => note.tags.includes($selectedTag))
				: $notesStore,
	);

	// Filtering notes by search term
	let filteredNotesBySearchTerm = derived(
		[filteredNotesByTag, searchTerm],
		([$filteredNotes, $searchTerm]) =>
			$searchTerm
				? $filteredNotes.filter((note) =>
						note.content
							.toLowerCase()
							.includes($searchTerm.toLowerCase()),
					)
				: $filteredNotes,
	);

	// Filtering notes by date
	let filteredNotesByDate = derived(
		[filteredNotesBySearchTerm, selectedDate],
		([$filteredNotes, $selectedDate]) =>
			$selectedDate
				? $filteredNotes.filter((note) => {
						const noteDateWithoutTime = new Date(note.date)
							.toISOString()
							.split("T")[0];
						const selectedDateWithoutTime = new Date($selectedDate)
							.toISOString()
							.split("T")[0];
						return noteDateWithoutTime === selectedDateWithoutTime;
					})
				: $filteredNotes,
	);
	function switchToLogin() {
		pageswitch = "login";
	}

	function switchToSignup() {
		pageswitch = "signup";
	}

	onMount(() => {
		// Fetch data from the server
		token.set(localStorage.getItem("token"));
		if ($token) {
			console.log("Token", $token);
			pageStatus = "logedin";
			userdetails.set(jwtDecode($token).user);
			try {
				(async () => {
					// Wrap the async function properly
					const response = await fetch(`${path}/api/notes`, {
						headers: { Authorization: $token },
					});
					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();
					console.log(data);
					updateNotes(data);
					updateLoading(false);
				})();
			} catch (error) {
				loading.set(true);
			}
		} else {
			console.log("No token");
		}
	});
</script>
<div class="status">

{#if loadingStatus}
  <Loading />
{/if}

{#if message}
  <MessagePopup message={message} />
{/if}
</div>
<div class="header">
	<h1>Notes</h1>
	{#if pageStatus == "logedin"}
		<button class="user-profile" on:click={() => openUserModal()}>
			{@html icons["user"].toSvg({
				class: "feather card user",
				width: "18px",
				height: "18px",
			})}
		</button>
		<button class="add" on:click={() => openModal(null, "new")}>
			{@html icons["edit"].toSvg({
				class: "feather card edit",
				width: "18px",
				height: "18px",
			})}
		</button>
	{/if}
</div>
{#if pageStatus == "home"}
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
		
	{#if pageswitch =="login"}
		<LoginForm data={logindata} login={async (logindata) =>await  login(logindata)} />
	{:else if pageswitch == "signup"}
		<SignupForm data={signupdata} signup={async (signupdata)=>await signup(signupdata)}/>
	{/if}
		</div>
	</div>
{:else if pageStatus == "logedin"}
	<div class="tag-wrapper">
		<Tag localStore={$notesStore} bind:selectedTag={$selectedTag} />
	</div>
	<div class="search">
		<Search bind:searchTerm={$searchTerm} />
		<input type="date" bind:value={$selectedDate} />
	</div>
	<div class="notes-wrapper">
		<Notes notesProp={$filteredNotesByDate} />
	</div>
	{#if modalAction == "new"}
		<Modal {modalNote} {modalAction} {closeModal} {handleAction} />
	{/if}
	{#if userModal}
		<UserProfile {closeModal} {signout} />
	{/if}
{/if}

<style>
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
		/* Styles for active state */
		background-color: #72d86a;
		color: #2a2a2a;
	}

	.highlight {
		/* Additional styles for highlighting */
		border: 2px solid black; /* Blue border as an example */
		pointer-events: none;
	}

	.dim {
		/* Styles for dimmed state */
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
</style>
