export interface BlogPost {
	slug: string;
	title: string;
	date: string; // ISO string or "YYYY-MM-DD"
	description: string;
	draft?: boolean;
}

export interface PortfolioItem {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	liveUrl?: string;
	githubUrl?: string;
}

export interface HomePageContent {
	name: string;
	role: string;
	location?: string;
	pronouns?: string;
	description?: string;
}
