import { fetchReply } from "./api.js";
import {
	appendMessage,
	showSpinner,
	hideSpinner,
	setSendEnabled,
	bindSend,
} from "./ui.js";

const STORAGE_KEY = "chatAI.history";

// Load and render chat history
function loadHistory() {
	const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	hist.forEach((msg) => appendMessage(msg.text, msg.sender));
}

// Save a message to localStorage
function saveMessage(text, sender) {
	const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	hist.push({ text, sender, timestamp: Date.now() });
	localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
}

// Handle send button or Enter key
async function handleSend() {
	const input = document.getElementById("user-input");
	const text = input.value.trim();
	if (!text) return;

	setSendEnabled(false);
	appendMessage(text, "user");
	saveMessage(text, "user");
	input.value = "";

	showSpinner();
	try {
		// rebuild "messages" array from history for full context
		const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
	loadHistory();
	bindSend(handleSend);
});
