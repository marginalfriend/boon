<script lang="ts">
import type { PortfolioItem } from "$lib/types/content";

export let data: {
	items: PortfolioItem[];
};
</script>

<svelte:head>
	<title>Portfolio | boon</title>
	<meta name="description" content="Projects and work samples" />
</svelte:head>

<main class="px-6 pb-6 pt-2">
	<article class="w-full">
		<h2>Portfolio</h2>
		<p class="text-[var(--tui-text-dim)] mb-4">Projects and things I've built.</p>
		
		{#if data.items.length === 0}
			<div class="tui-empty">
				<span>No projects yet. Check back soon!</span>
			</div>
		{:else}
			<div class="tui-table">
				<div class="tui-table-header">
					<span class="tui-col-title">PROJECT</span>
					<span class="tui-col-tags">TAGS</span>
				</div>
				<div class="tui-table-body">
					{#each data.items as item}
						<a href="/portfolio/{item.slug}" class="tui-table-row">
							<span class="tui-col-title">
								<span class="tui-row-title">{item.title}</span>
							</span>
							<span class="tui-col-tags">
								{#each item.tags.slice(0, 3) as tag}
									<span class="tui-tag">{tag}</span>
								{/each}
								{#if item.tags.length > 3}
									<span class="tui-tag-more">+{item.tags.length - 3}</span>
								{/if}
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</article>
</main>
