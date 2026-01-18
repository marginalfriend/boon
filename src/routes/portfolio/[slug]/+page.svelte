<script lang="ts">
import type { Component } from "svelte";
import type { PortfolioItem } from "$lib/types/content";

export let data: {
	metadata: PortfolioItem;
	component: Component;
};
</script>

<svelte:head>
	<title>{data.metadata.title} | boon</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<main>
	<article class="w-full">
		<header class="mb-6">
			<div class="tui-breadcrumb">
				<a href="/#portfolio">← Back to Portfolio</a>
			</div>
			<h1 class="!mt-4">{data.metadata.title}</h1>
			
			<div class="tui-meta">
				{#if data.metadata.tags.length > 0}
					<div class="tui-tags">
						{#each data.metadata.tags as tag}
							<span class="tui-tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
			
			{#if data.metadata.liveUrl || data.metadata.githubUrl}
				<div class="tui-links">
					{#if data.metadata.liveUrl}
						<a href={data.metadata.liveUrl} target="_blank" rel="noopener noreferrer" class="tui-link">
							[Live Demo]
						</a>
					{/if}
					{#if data.metadata.githubUrl}
						<a href={data.metadata.githubUrl} target="_blank" rel="noopener noreferrer" class="tui-link">
							[GitHub]
						</a>
					{/if}
				</div>
			{/if}
		</header>
		
		<div class="wiki-content">
			<svelte:component this={data.component} />
		</div>
	</article>
</main>
