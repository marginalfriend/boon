// svelte.config.js

import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";

// Create highlighter instance
const highlighter = await createHighlighter({
	themes: ["github-dark"],
	langs: ["javascript", "typescript", "svelte", "bash", "yaml", "json", "css", "html", "rust", "text"],
});

/**
 * Escape characters that would be interpreted by Svelte
 */
function escapeSvelte(code) {
	return code
		.replace(/\{/g, "&#123;")
		.replace(/\}/g, "&#125;")
		.replace(/`/g, "&#96;");
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".mdx"],
	highlight: {
		highlighter: (code, lang) => {
			if (!lang) lang = "text";
			try {
				const html = highlighter.codeToHtml(code, {
					lang,
					theme: "github-dark",
				});
				return escapeSvelte(html);
			} catch (e) {
				// Fallback for unsupported languages
				const escaped = code
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/\{/g, "&#123;")
					.replace(/\}/g, "&#125;");
				return `<pre class="shiki"><code>${escaped}</code></pre>`;
			}
		},
	},
};

// Export config
const config = {
	extensions: [".svelte", ".mdx"],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({ strict: false }),
		paths: {
			base: "",
		},
		alias: {
			$content: "src/content",
		},
	},
};

export default config;
