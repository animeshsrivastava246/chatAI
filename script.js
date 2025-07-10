const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
	const message = userInput.value.trim();
	if (!message) return;

	appendMessage(message, "user");
	userInput.value = "";

	try {
		const response = await fetch("http://localhost:3000/api/chat", {
			// Replace with your API endpoint
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message }),
		});

		const data = await response.json();
		appendMessage(data.reply || "Sorry, no response", "bot");
	} catch (error) {
		appendMessage("⚠️ Error talking to the model API.", "bot");
	}
}

function appendMessage(message, sender) {
	const div = document.createElement("div");
	div.className = `message ${sender}`;
	div.innerText = message;
	chatBox.appendChild(div);
	chatBox.scrollTop = chatBox.scrollHeight;
}

userInput.addEventListener("keypress", function (e) {
	if (e.key === "Enter") sendMessage();
});
