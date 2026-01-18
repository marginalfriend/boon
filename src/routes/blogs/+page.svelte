<script lang="ts">
import type { BlogPost } from "$lib/types/content";

export let data: {
	posts: BlogPost[];
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toISOString().split('T')[0];
}
</script>

<svelte:head>
	<title>Blogs | boon</title>
	<meta name="description" content="Blog posts and articles" />
</svelte:head>

<main class="px-6 pb-6 pt-2">
	<article class="w-full">
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
	</article>
</main>
