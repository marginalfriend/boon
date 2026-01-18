<script lang="ts">
import type { Component } from "svelte";
import type { BlogPost } from "$lib/types/content";

export let data: {
	metadata: BlogPost;
	component: Component;
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
</script>

<svelte:head>
	<title>{data.metadata.title} | boon</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<main>
	<article class="w-full">
		<header class="mb-6">
			<div class="tui-breadcrumb">
				<a href="/#blogs">← Back to Blogs</a>
			</div>
			<h1 class="!mt-4">{data.metadata.title}</h1>
			<div class="tui-meta">
				<span class="tui-meta-date">{formatDate(data.metadata.date)}</span>
				{#if data.metadata.draft}
					<span class="tui-badge-draft">[draft]</span>
				{/if}
			</div>
		</header>
		
		<div class="wiki-content">
			<svelte:component this={data.component} />
		</div>
	</article>
</main>
