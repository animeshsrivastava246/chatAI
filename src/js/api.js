import { CONFIG } from "../config.js";

/**
 * Calls GitHub Models Marketplace Completions API directly.
 * Docs: https://docs.github.com/rest/learning-endpoints/models
 */
export async function fetchReply(messages) {
	const url = `https://api.github.com/models/${CONFIG.MODEL_SLUG}/completions`;

	const body = {
		messages: messages.map((m) => ({
			role: m.role,
			content: m.content,
		})),
	};

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`GitHub API error: ${res.status} ${errText}`);
	}

	const data = await res.json();
	// GitHub returns an array of choices; take the first
	if (data.choices && data.choices.length > 0) {
		return data.choices[0].message.content;
	}
	throw new Error("No completion returned");
}
