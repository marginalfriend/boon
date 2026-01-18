import { error } from "@sveltejs/kit";
import type { BlogPost, PortfolioItem } from "$lib/types/content";

// Helper: safely parse date strings
function parseDate(date: string): Date {
	const d = new Date(date);
	if (isNaN(d.getTime())) {
		throw new Error(`Invalid date: ${date}`);
	}
	return d;
}

/**
 * Get all blog posts (sorted by date, excluding drafts in production)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob("/src/content/blogs/*.mdx", {
		eager: true,
		import: "metadata",
	}) as Record<string, Record<string, any>>;

	const posts: BlogPost[] = Object.entries(modules).map(
		([path, metadata]) => {
			const slug = path.split("/").pop()!.replace(".mdx", "");
			return {
				slug,
				title: metadata.title,
				date: metadata.date,
				description: metadata.description || "",
				draft: metadata.draft ?? false,
			};
		},
	);

	// Filter out drafts in production
	const filtered = import.meta.env.PROD
		? posts.filter((post) => !post.draft)
		: posts;

	return filtered.sort(
		(a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
	);
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string) {
	try {
		const post = await import(`../../content/blogs/${slug}.mdx`);
		const metadata: BlogPost = {
			slug,
			title: post.metadata.title,
			date: post.metadata.date,
			description: post.metadata.description || "",
			draft: post.metadata.draft,
		};

		if (import.meta.env.PROD && metadata.draft) {
			throw error(404);
		}

		return {
			metadata,
			component: post.default,
		};
	} catch (e) {
		console.error("Failed to load blog post:", e);
		throw error(404, "Blog post not found");
	}
}

/**
 * Get all portfolio items (sorted alphabetically by title)
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
	const modules = import.meta.glob("/src/content/portfolio/*.mdx", {
		eager: true,
		import: "metadata",
	}) as Record<string, Record<string, any>>;

	const items: PortfolioItem[] = Object.entries(modules).map(
		([path, metadata]) => {
			const slug = path.split("/").pop()!.replace(".mdx", "");
			return {
				slug,
				title: metadata.title,
				description: metadata.description || "",
				tags: metadata.tags || [],
				liveUrl: metadata.liveUrl,
				githubUrl: metadata.githubUrl,
			};
		},
	);

	return items.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get a single portfolio item by slug
 */
export async function getPortfolioItem(slug: string) {
	try {
		const item = await import(`../../content/portfolio/${slug}.mdx`);
		const metadata: PortfolioItem = {
			slug,
			title: item.metadata.title,
			description: item.metadata.description || "",
			tags: item.metadata.tags || [],
			liveUrl: item.metadata.liveUrl,
			githubUrl: item.metadata.githubUrl,
		};

		return {
			metadata,
			component: item.default,
		};
	} catch (e) {
		console.error("Failed to load portfolio item:", e);
		throw error(404, "Portfolio item not found");
	}
}
