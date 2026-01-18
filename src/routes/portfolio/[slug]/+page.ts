import { getPortfolioItem } from "$lib/utils/content";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	const { metadata, component } = await getPortfolioItem(params.slug);
	return {
		metadata,
		component,
	};
}) satisfies PageLoad;
