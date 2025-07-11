const chatBox = document.getElementById("chat-box");
const spinner = document.getElementById("spinner");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

export function appendMessage(text, sender) {
	const div = document.createElement("div");
	div.className = `message ${sender}`;
	div.textContent = text;
	chatBox.appendChild(div);
	chatBox.scrollTop = chatBox.scrollHeight;
}

export function showSpinner() {
	spinner.hidden = false;
}

export function hideSpinner() {
	spinner.hidden = true;
}

export function setSendEnabled(enabled) {
	sendBtn.disabled = !enabled;
	userInput.disabled = !enabled;
}

export function bindSend(handler) {
	sendBtn.addEventListener("click", handler);
	userInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter") handler();
	});
}
