const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chart = document.querySelector(".chart");

function createMessageElement(content, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
    messageDiv.textContent = content;
    return messageDiv;
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateChart(data) {
    const bars = chart.querySelectorAll(".bar");
    const colors = ['#6c35de', '#a364ff', '#ffc7ff', '#cb80ff', '#373737'];
    bars.forEach((bar, index) => {
        const height = data[index] + "%";
        bar.style.height = height;
        bar.style.backgroundColor = colors[index % colors.length];
    });
}

function animateLoadingDots(loadingMessage) {
    let dots = 0;
    return setInterval(() => {
        dots = (dots + 1) % 4;
        loadingMessage.textContent = "Analyzing your request" + ".".repeat(dots);
    }, 300);
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    messagesDiv.appendChild(createMessageElement(userMessage, true));
    scrollToBottom();

    // Clear input field
    userInput.value = "";

    // Display loading message
    const loadingMessage = createMessageElement("Analyzing your request...", false);
    messagesDiv.appendChild(loadingMessage);
    scrollToBottom();

    // Start loading animation
    const loadingAnimation = animateLoadingDots(loadingMessage);

    try {
        // Send to backend
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        // Remove loading message
        messagesDiv.removeChild(loadingMessage);

        // Display bot response
        if (data.reply) {
            messagesDiv.appendChild(createMessageElement(data.reply, false));
            
            // Update chart with mock data
            const mockData = [60, 80, 40, 90, 70];
            updateChart(mockData);
        } else {
            messagesDiv.appendChild(createMessageElement("Sorry, I couldn't analyze that. Could you try rephrasing?", false));
        }
    } catch (error) {
        // Remove loading message
        messagesDiv.removeChild(loadingMessage);

        messagesDiv.appendChild(createMessageElement("Error connecting to the analysis server. Please try again later.", false));
        console.error("Error:", error);
    }

    // Stop loading animation
    clearInterval(loadingAnimation);

    scrollToBottom();
}

// Send message on button click
sendButton.addEventListener("click", sendMessage);

// Send message on Enter key press
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Add welcome message
window.addEventListener("load", () => {
    messagesDiv.appendChild(createMessageElement("Welcome to SocialPulse AI! How can I help you analyze your social media engagement today?", false));
});


