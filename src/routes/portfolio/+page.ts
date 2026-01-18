import { getPortfolioItems } from "$lib/utils/content";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const items = await getPortfolioItems();
	return { items };
}) satisfies PageLoad;
