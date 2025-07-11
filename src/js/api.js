import { CONFIG } from "../config.js";

/**
 * send a chat request to your backend,
 * which in turn calls GitHub Models Marketplace
 */
export async function fetchReply(messages) {
	const res = await fetch(`${CONFIG.API_BASE}/chat`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...CONFIG.AUTH_HEADERS,
		},
		body: JSON.stringify({ messages }),
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(err || "Network error");
	}

	const payload = await res.json();
	// assume payload.reply is the model text
	return payload.reply;
}
