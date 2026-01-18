import type { HomePageContent } from "$lib/types/content";
import { getBlogPosts, getPortfolioItems } from "$lib/utils/content";
import type { PageLoad } from "./$types";

export const load = (async () => {
	// Import MDX content at build time
	const { default: ProfileContent, metadata } = await import(
		"$content/home/profile.mdx"
	);

	// Validate required fields at runtime
	if (typeof metadata.name !== "string") {
		throw new Error("Missing required 'name' field in profile.mdx frontmatter");
	}
	if (typeof metadata.role !== "string") {
		throw new Error("Missing required 'role' field in profile.mdx frontmatter");
	}

	const homeContent: HomePageContent = {
		name: metadata.name,
		role: metadata.role,
		location:
			typeof metadata.location === "string" ? metadata.location : undefined,
		pronouns:
			typeof metadata.pronouns === "string" ? metadata.pronouns : undefined,
		description:
			typeof metadata.description === "string"
				? metadata.description
				: undefined,
	};

	// Load blogs and portfolio items
	const posts = await getBlogPosts();
	const portfolioItems = await getPortfolioItems();

	return {
		profileComponent: ProfileContent,
		homeContent,
		posts,
		portfolioItems,
	};
}) satisfies PageLoad;
