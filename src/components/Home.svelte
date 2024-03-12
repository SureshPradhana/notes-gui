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

  

  </script>
  
  <div class="home">
    <header>
      <h1>Notes</h1>
      {#if Object.keys($userdetails).length != 0}
      <Link to="/notes" class="login-signup">Dashboard</Link>
        {:else}
        <Link to="/login" class="login-signup">Login / Sign Up</Link>
        {/if}
      
  </header>
  
  <div class="hero">
      <h2>Manage your bucket list and notes efficiently.</h2>
  </div>
  
  <footer>
      <p>&copy; 2024. All rights reserved.</p>
  </footer>

  </div>





  
  <style>
    .home {
      margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #121212;
        color: #fff;
    }

    header {
        background-color: #333;
        padding: 20px 20px;
        text-align: center;
        height:80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    header h1 {
        margin: 0;
    }

    .hero {
        background-image: url('hero-image.jpg');
        background-size: cover;
        background-position: center;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: calc(100vh - 130px);
    }

    .hero h2 {
        font-size: 36px;
        margin: 0;
    }

    footer {
        background-color: #333;
        padding: 20px 0;
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
    }

    footer p {
        margin: 0;
    }

    :global(.login-signup){
        float: right;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border: 1px solid #fff;
        border-radius: 5px;
    }

    :global(.login-signup:hover)   {
        background-color: #fff;
        color: #333;
    }
  </style>