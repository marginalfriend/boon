<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";

const { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen w-full flex flex-col items-center p-6">
    <div class="main-container w-full">
        <div class="wiki-prose prose">
            {@render children()}
        </div>
    </div>
</div>
