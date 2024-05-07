<script>
    import { Link } from "svelte-routing";
    import { userdetails } from "../../stores";
</script>

<div class="home">
    <div class="header-wrapper">
        <header class="container mx-auto p-4">
            <h1 class="text-2xl font-bold">Notes</h1>
            {#if Object.keys($userdetails).length == 0}
                <Link to="/login" class="login-signup">Login / Sign Up</Link>
            {:else}
                <Link to="/notes" class="login-signup">Dashboard</Link>
            {/if}
        </header>
    </div>

    <div class=" min-h-screen">
        <div class="container mx-auto p-4">
            <div class="mt-8">
                <h1
                    class="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-4"
                >
                    Welcome to Notes Bucketlist & Flashcards
                </h1>
                <p class="text-zinc-600 dark:text-zinc-300 mb-4">
                    Manage your notes, bucket list and flash cards efficiently.
                </p>
                <a href="/login">
                    <button class="px-4 py-2 rounded-lg bg-blue-500 text-white"
                        >Get Started</button
                    ></a
                >
            </div>

            <div class="mt-8">
                <h2
                    class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4"
                >
                    Key Features
                </h2>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Organize Notes
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Easily organize your notes into categories and tags
                            for better management.
                        </p>
                    </div>

                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Flashcards
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Create interactive flashcards to help you study and
                            memorize important information.
                        </p>
                    </div>

                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Collaborate
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Share your notes and flashcards with friends and
                            classmates for collaborative learning.
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Markdown Support
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Easily format your notes using markdown syntax.
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Tags Support
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Organize your notes with tags for easy access.
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4"
                    >
                        <h3
                            class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                        >
                            Search Capabilities
                        </h3>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            Quickly find any note using powerful search
                            functionality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
        background-color: var(--background-2);
        color: var(--white);
        .header-wrapper {
            background-color: var(--background-color);
        }

        header {
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
                color: var(--text-color);
                text-decoration: none;
                padding: 10px 20px;
                border: 1px solid var(--text-color);
                border-radius: 5px;
            }

            :global(.login-signup:hover) {
                background-color: var(--tag-background);
                color: var(--text-color);
                border: 1px solid var(--text-color);
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
