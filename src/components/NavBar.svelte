<script>
    import { icons } from "feather-icons";
    import { get } from "svelte/store";
    import { userdetails ,userModal} from "../stores.js";
    import { Link } from "svelte-routing";
    import { onMount } from "svelte";
    import {onDestroy} from "svelte";
    

    let name;
    let email;
    let userDetailsValue;
    let navToggleChecked=true;
    const unsubscribe = userdetails.subscribe((value) => {
            userDetailsValue = value;
        });

    function openUserModal() {
		$userModal=true
	}

	function closeModal() {
		$userModal=false
	}

    onMount(() => {
        if (window.innerWidth <= 600) { // adjust 600 to your mobile breakpoint
      navToggleChecked = true;
    }

        // Remember to unsubscribe when you no longer need the updates
        
        email = userDetailsValue.email;

        name = email.split("@")[0];
    });

    onDestroy(unsubscribe);

</script>

<div id="nav-bar">
    <input id="nav-toggle" type="checkbox" bind:checked={navToggleChecked} />
    <div id="nav-header">
        <a id="nav-title" href="/" target="_blank"
            >N<i class="fab fa-codepen"></i>otes</a
        >
        <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
        <hr />
    </div>
    <div id="nav-content">
        <Link to="/">
        <div class="nav-button">
            
            <i class="fas"
                >{@html icons["home"].toSvg({
                    class: "feather ",
                    width: "18px",
                    height: "18px",
                })}</i
            ><span><a href="/">Home</a></span>
            
        </div>
    </Link>
    <Link to="/notes">
        <div class="nav-button">
            <i class="fas"
                >{@html icons["file-text"].toSvg({
                    class: "feather ",
                    width: "18px",
                    height: "18px",
                })}</i
            ><span>Notes</span>
        </div>
    </Link>
    <Link to="/bucketlist">
        <div class="nav-button">
            <i class="fas"
                >{@html icons["list"].toSvg({
                    class: "feather",
                    width: "18px",
                    height: "18px",
                })}</i
            ><span>Bucket List</span>
        </div>
    </Link>
        <hr />
        <div id="nav-content-highlight"></div>
    </div>
   
   

    <input id="nav-footer-toggle" type="checkbox" />
    <div id="nav-footer">
        <div id="nav-footer-heading">
            <button
                    id="nav-footer-title"
                    href="/"
                    target="_blank" on:click={openUserModal}>
            <div id="nav-footer-avatar" >
                {@html icons["user"].toSvg({
                    class: "feather",
                })}
            </div>
            <div id="nav-footer-titlebox">
                {name}
            </div>
            <label for="nav-footer-toggle"
                ><i class="fas fa-caret-up"></i></label
            >
        </div>
    </div>
</div>

<style>
    :root {
        --background: #9c88ff;
        --navbar-width: 256px;
        --navbar-width-min: 70px;
        --navbar-dark-primary: #242424;
        --navbar-dark-secondary: #2c3e50;
        --navbar-light-primary: #f5f6fa;
        --navbar-light-secondary: rgba(255, 255, 255, 0.8);
    }

    #nav-toggle:checked ~ #nav-header {
        width: calc(var(--navbar-width-min) - 16px);
    }
    #nav-toggle:checked ~ #nav-content,
    #nav-toggle:checked ~ #nav-footer {
        width: var(--navbar-width-min);
    }
    #nav-toggle:checked ~ #nav-header #nav-title {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s;
    }
    #nav-toggle:checked ~ #nav-header label[for="nav-toggle"] {
        left: calc(50% - 8px);
        transform: translate(-50%);
    }
    #nav-toggle:checked ~ #nav-header #nav-toggle-burger {
        background: var(--navbar-light-primary);
    }
    #nav-toggle:checked ~ #nav-header #nav-toggle-burger:before,
    #nav-toggle:checked ~ #nav-header #nav-toggle-burger::after {
        width: 16px;
        background: var(--navbar-light-secondary);
        transform: translate(0, 0) rotate(0deg);
    }
    #nav-toggle:checked ~ #nav-content .nav-button span {
        opacity: 0;
        transition: opacity 0.1s;
    }
    #nav-toggle:checked ~ #nav-content .nav-button  .fas {
        min-width: calc(100% - 16px);
    }
    #nav-toggle:checked ~ #nav-footer #nav-footer-avatar {
        margin-left: 0;
        left: 50%;
        transform: translate(-50%);
    }
    #nav-toggle:checked ~ #nav-footer #nav-footer-titlebox,
    #nav-toggle:checked ~ #nav-footer label[for="nav-footer-toggle"] {
        opacity: 0;
        transition: opacity 0.1s;
        pointer-events: none;
    }

    #nav-bar {
        /* position: absolute; */
        /* left: 1vw;
  top: 1vw; */
        height: 100vh;
        background: var(--navbar-dark-primary);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        color: var(--navbar-light-primary);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        /* overflow: hidden; */
        user-select: none;
    }
    #nav-bar hr {
        margin: 0;
        position: relative;
        left: 16px;
        width: calc(100% - 32px);
        border: none;
        border-top: solid 1px var(--navbar-dark-secondary);
    }
    #nav-bar a {
        color: inherit;
        text-decoration: inherit;
    }
    #nav-bar input[type="checkbox"] {
        display: none;
    }

    #nav-header {
        position: relative;
        width: var(--navbar-width);
        left: 16px;
        width: calc(var(--navbar-width) - 16px);
        min-height: 80px;
        background: var(--navbar-dark-primary);
        border-radius: 16px;
        /* z-index: 2; */
        display: flex;
        align-items: center;
        transition: width 0.2s;
    }
    #nav-header hr {
        position: absolute;
        bottom: 0;
    }

    #nav-title {
        font-size: 1.5rem;
        transition: opacity 1s;
        padding-left: 1em;
    }

    label[for="nav-toggle"] {
        position: absolute;
        right: 0;
        width: 3rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    #nav-toggle-burger {
        position: relative;
        width: 16px;
        height: 2px;
        background: var(--navbar-dark-primary);
        border-radius: 99px;
        transition: background 0.2s;
    }
    #nav-toggle-burger:before,
    #nav-toggle-burger:after {
        content: "";
        position: absolute;
        top: -6px;
        width: 10px;
        height: 2px;
        background: var(--navbar-light-primary);
        border-radius: 99px;
        transform: translate(2px, 8px) rotate(30deg);
        transition: 0.2s;
    }
    #nav-toggle-burger:after {
        top: 6px;
        transform: translate(2px, -8px) rotate(-30deg);
    }

    #nav-content {
        margin: -16px 0;
        padding: 16px 0;
        position: relative;
        flex: 1;
        width: var(--navbar-width);
        background: var(--navbar-dark-primary);
        /* box-shadow: 0 0 0 16px var(--navbar-dark-primary); */
        direction: rtl;
        overflow-x: hidden;
        transition: width 0.2s;
    }
    #nav-content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    #nav-content::-webkit-scrollbar-thumb {
        border-radius: 99px;
        background-color: #d62929;
    }
    #nav-content::-webkit-scrollbar-button {
        height: 16px;
    }

    #nav-content-highlight {
        position: absolute;
        left: 16px;
        top: -70px;
        width: calc(100% - 16px);
        height: 54px;
        background: var(--background);
        background-attachment: fixed;
        border-radius: 16px 0 0 16px;
        transition: top 0.2s;
    }
    #nav-content-highlight:before,
    #nav-content-highlight:after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 100%;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        box-shadow: 16px 16px var(--background);
    }
    #nav-content-highlight:after {
        top: 100%;
        box-shadow: 16px -16px var(--background);
    }
   

    .nav-button{
        position: relative;
        margin-left: 16px;
        height: 54px;
        display: flex;
     
        align-items: center;
        color: var(--navbar-light-secondary);
        direction: ltr;
        cursor: pointer;
        z-index: 1;
        transition: color 0.2s;
    }
    .nav-button span{
        transition: opacity 1s;
    }
    .nav-button .fas {
        transition: min-width 0.2s;
    }
    .nav-button:nth-of-type(1):hover {
        color: var(--navbar-dark-primary);
    }
    
    .nav-button:nth-of-type(6):hover {
        color: var(--navbar-dark-primary);
    }

    .nav-button:hover{
        background-color:#9c95bd;
    }
   

    #nav-bar .fas {
        min-width: 3rem;
        text-align: center;
    }

    #nav-footer {
        position: relative;
        width: var(--navbar-width);
        height: 54px;
        background: #393e41;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        z-index: 2;
        transition:
            width 0.2s,
            height 0.2s;
    }

    #nav-footer-heading {
        position: relative;
        width: 100%;
        height: 54px;
        
    }
    #nav-footer-heading button{
        display: flex;
        align-items: center;
    }

    #nav-footer-avatar {
        position: relative;
        margin: 11px 0 11px 16px;
        left: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        transform: translate(0);
        transition: 0.2s;
    }
    #nav-footer-avatar img {
        height: 100%;
    }

    #nav-footer-titlebox {
        position: relative;
        margin-left: 16px;
        width: 10px;
        display: flex;
        flex-direction: column;
        transition: opacity 1s;
    }

    #nav-footer-subtitle {
        color: var(--navbar-light-secondary);
        font-size: 0.6rem;
    }

    #nav-toggle:not(:checked) ~ #nav-footer-toggle:checked + #nav-footer {
        height: 30%;
        min-height: 54px;
    }
    #nav-toggle:not(:checked)
        ~ #nav-footer-toggle:checked
        + #nav-footer
        label[for="nav-footer-toggle"] {
        transform: rotate(180deg);
    }

    label[for="nav-footer-toggle"] {
        position: absolute;
        right: 0;
        width: 3rem;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition:
            transform 0.2s,
            opacity 0.2s;
    }

    @media only screen and (max-width: 600px) {
       :root{
        --navbar-width:100vw;
       }
    }

  

/* This media query targets screens with a width of more than 600px */

</style>
