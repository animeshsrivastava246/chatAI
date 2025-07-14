/**
 * You must create a GitHub Personal Access Token that has
 * the `models/completions` scope enabled.
 *
 * WARNING: Placing a secret in frontend code makes it
 * visible to anyone who inspects your bundle.
 */
export const CONFIG = {
	GITHUB_TOKEN: "ghp_YOUR_PERSONAL_ACCESS_TOKEN",
	// model slug from the Marketplace, e.g. "openai/gpt-3.5-turbo"
	MODEL_SLUG: "openai/gpt-3.5-turbo",
};
