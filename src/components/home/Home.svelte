<script>
    import { Link } from "svelte-routing";
    import { userdetails } from "../../stores.js";
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
        <h2>Manage your notes, bucket list and flash cards efficiently.</h2>
    </div>

    <footer>
        <p>&copy; 2024. All rights reserved.</p>
    </footer>
</div>

<style lang="scss">
    .home {
        margin: 0;
        padding: 0;
        font-family: var(--sans);
        background-color: var(--black);
        color: var(--white);

        header {
            background-color: var(--background-color);
            padding: 20px 20px;
            text-align: center;
            height: 80px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            h1 {
                margin: 0;
            }

            :global(.login-signup) {
                float: right;
                color: var(--white);
                text-decoration: none;
                padding: 10px 20px;
                border: 1px solid var(--white);
                border-radius: 5px;
            }

            :global(.login-signup:hover) {
                background-color: var(--white);
                color: var(--black);
                border: 1px solid var(--black);
            }
        }

        .hero {
            background-size: cover;
            background-position: center;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: calc(100vh - 130px);
            h2 {
                font-size: 36px;
                margin: 0;
            }
        }

        footer {
            background-color: var(--background-color);
            padding: 20px 0;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 50px;
            p {
                margin: 0;
            }
        }
    }
</style>
