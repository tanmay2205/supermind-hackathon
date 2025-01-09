
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const sendMessage = async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    const userDiv = document.createElement("div");
    const userBold = document.createElement("strong");
    userBold.textContent = "You:";
    userDiv.appendChild(userBold);
    const userMessageDiv = document.createElement("div");
    userMessageDiv.textContent = userMessage;
    userDiv.appendChild(userMessageDiv);
    messagesDiv.appendChild(userDiv);

    // Display loading message for bot
    const loadingDiv = document.createElement("div");
    const botBold = document.createElement("strong");
    botBold.textContent = "Bot:";
    loadingDiv.appendChild(botBold);
    const loadingMessageDiv = document.createElement("div");
    loadingMessageDiv.textContent = "...";
    loadingDiv.appendChild(loadingMessageDiv);
    loadingDiv.classList.add("loading");
    messagesDiv.appendChild(loadingDiv);

    // Clear the input field
    userInput.value = "";

    // Scroll to the bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        // Send to backend
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        // Ensure the response from the backend contains the correct structure
        if (data.reply) {
            // Replace loading message with bot response
            loadingMessageDiv.textContent = data.reply;
        } else {
            loadingMessageDiv.textContent = "Sorry, something went wrong!";
        }
    } catch (error) {
        loadingMessageDiv.textContent = "Error connecting to server!";
        console.error("Error:", error);
    }

    // Scroll to the bottom again in case the new message pushed it out of view
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Send message on "Send" button click
sendButton.addEventListener("click", sendMessage);

// Send message on "Enter" key press
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission if inside a form
        sendMessage();
    }
});
