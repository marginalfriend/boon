<script lang="ts">
import type { Component } from "svelte";
import type { HomePageContent, BlogPost, PortfolioItem } from "$lib/types/content";

export let data: {
	profileComponent: Component;
	homeContent: HomePageContent;
	posts: BlogPost[];
	portfolioItems: PortfolioItem[];
};

const { name, role, location, pronouns } = data.homeContent;

// Generate a fallback description if none provided
const description =
	data.homeContent.description ??
	`${name} is a ${role}${location ? ` based in ${location}` : ""}.`;

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toISOString().split('T')[0];
}
</script>

<svelte:head>
	<title>{name} | {role}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{name} | {role}" />
	<meta property="og:description" content={description} />
</svelte:head>

<main>
	<article class="w-full">
		<svelte:component this={data.profileComponent} />
	</article>

	<!-- Blogs Section -->
	<section id="blogs" class="mt-8">
		<h2>Blogs</h2>
		<p class="text-[var(--tui-text-dim)] mb-4">Articles and thoughts on software development.</p>
		
		{#if data.posts.length === 0}
			<div class="tui-empty">
				<span>No posts yet. Check back soon!</span>
			</div>
		{:else}
			<div class="tui-table">
				<div class="tui-table-header">
					<span class="tui-col-date">DATE</span>
					<span class="tui-col-title">TITLE</span>
				</div>
				<div class="tui-table-body">
					{#each data.posts as post}
						<a href="/blogs/{post.slug}" class="tui-table-row">
							<span class="tui-col-date">{formatDate(post.date)}</span>
							<span class="tui-col-title">
								<span class="tui-row-title">{post.title}</span>
								{#if post.draft}
									<span class="tui-badge-draft">[draft]</span>
								{/if}
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</section>

	<!-- Portfolio Section -->
	<section id="portfolio" class="mt-8">
		<h2>Portfolio</h2>
		<p class="text-[var(--tui-text-dim)] mb-4">Projects and things I've built.</p>
		
		{#if data.portfolioItems.length === 0}
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
					{#each data.portfolioItems as item}
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
	</section>
</main>
