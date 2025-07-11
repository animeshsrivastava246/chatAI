import { fetchReply } from "./api.js";
import {
	appendMessage,
	showSpinner,
	hideSpinner,
	setSendEnabled,
	bindSend,
} from "./ui.js";

const STORAGE_KEY = "chatAI.history";

// load chat history on startup
function loadHistory() {
	const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	hist.forEach(({ text, sender }) => appendMessage(text, sender));
	return hist;
}

// save a single message to storage
function saveMessage(text, sender) {
	const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	hist.push({ text, sender, timestamp: Date.now() });
	localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
}

async function handleSend() {
	const input = document.getElementById("user-input");
	const msg = input.value.trim();
	if (!msg) return;

	// disable input while processing
	setSendEnabled(false);
	appendMessage(msg, "user");
	saveMessage(msg, "user");
	input.value = "";

	showSpinner();
	try {
		// include entire history for context
		const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
		// map to format your backend expects
		const messages = history.map((h) => ({
			role: h.sender === "user" ? "user" : "assistant",
			content: h.text,
		}));

		const reply = await fetchReply(messages);
		appendMessage(reply, "bot");
		saveMessage(reply, "bot");
	} catch (err) {
		appendMessage(`⚠️ ${err.message}`, "bot");
	} finally {
		hideSpinner();
		setSendEnabled(true);
	}
}

// initialize
document.addEventListener("DOMContentLoaded", () => {
	loadHistory();
	bindSend(handleSend);
});
