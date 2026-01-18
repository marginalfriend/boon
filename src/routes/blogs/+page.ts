import { getBlogPosts } from "$lib/utils/content";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const posts = await getBlogPosts();
	return { posts };
}) satisfies PageLoad;
