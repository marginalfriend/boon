declare module "*.mdx" {
	import type { SvelteComponent } from "svelte";

	// Extend this interface based on your frontmatter
	interface Metadata {
		// Common fields
		title?: string;
		date?: string;
		description?: string;
		draft?: boolean;
		// Profile fields
		name?: string;
		role?: string;
		location?: string;
		pronouns?: string;
		[key: string]: unknown; // Allow extra fields
	}

	export const metadata: Metadata;

	const component: typeof SvelteComponent;

	export default component;
}
