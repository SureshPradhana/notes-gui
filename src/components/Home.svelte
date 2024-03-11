<script>
    import { Link } from 'svelte-routing';
    import  {userdetails,userModal,token} from '../stores.js';
    import {icons} from "feather-icons";
    import { onMount } from 'svelte';
    let email;
    let name;

   

    onMount(()=>{
        email = $userdetails.email;

        name = email.split("@")[0];
    })

    async function signout() {
		localStorage.removeItem("token");
		token.set("");
		userdetails.set({})

	}

  </script>
  
  <div class="home">
    <h1>Manage your bucket list and notes efficiently.</h1>
    <div class="buttons">
        {#if Object.keys($userdetails).length != 0}
        <div class="routes">
        <Link to ="/notes">notes</Link>
        <Link to ="/bucketlist">bucket list</Link>
      </div>
        <button
                    id="nav-footer-title"
                    href="/"
                    target="_blank" >
            <div id="nav-footer-avatar" >
                {@html icons["user"].toSvg({
                    class: "feather",
                })}
            </div>
            <div id="nav-footer-titlebox">
                {name}
            </div>
        </button>
        <div class="signout-wrapper">
        <button on:click={signout} class="button-signout">signout</button>
        </div>
        {:else}
        <Link to="/login" class="button-login">Login or Signup</Link>
        {/if}
    </div>
  </div>
  
  <style>
    .home {
      text-align: center;
      padding: 1em;
    }
  
    :global(.button-login) {
      display: inline-block;
      margin: 1em;
      padding: 0.5em 1em;
      text-decoration: none;
      background-color: #007BFF;
      color: white;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
  
    :global(.button-login:hover) {
      background-color: #0056b3;
      color: white;
    }
    .routes{
        display: flex;
        flex-direction: row;
      justify-content: center;
    }
    :global(.routes a){
        background-color:#343e41;
        margin: 4px;
        padding: 10px;
        color:white;
    }
    .button-signout {
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-signout:hover {
  background-color: #da190b;
}
  </style>