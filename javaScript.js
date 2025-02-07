let chatbox = document.getElementById("chatbox");
let chatMessages = document.getElementById("chatbox-messages");
let chatInput = document.getElementById("chatbox-input");
let chatSend = document.getElementById("chatbox-send");
let chatToggle = document.getElementById("chatbot-toggle");
let chatCancel = document.getElementById("chatbox-cancel");

let chatStage = 1;

chatToggle.addEventListener("click", function() {
    chatbox.style.display = "block";
    chatMessages.innerHTML = "";  // Clear previous messages
    chatStage = 1;
    addMessage("bot", "Hello! How can I help you?");
});

chatSend.addEventListener("click", function() {
    let userMessage = chatInput.value.trim();
    if (userMessage === "") return;
    
    addMessage("user", userMessage);
    chatInput.value = "";
    handleChat(userMessage);
});

chatCancel.addEventListener("click", function() {
    chatbox.style.display = "none";  // Close chat when cancel is clicked
});

function addMessage(sender, text) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    
    // Add a tag to show who is speaking
    if (sender === "bot") {
        text = "🤖 Bot: " + text;
    } else {
        text = "👤 User: " + text;
    }

    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addJobOptions() {
    let options = ["Web Development", "Data Analyst", "Software Development", "Full Stack Developer"];
    options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.style.display = "block";
        button.style.width = "100%";
        button.style.marginTop = "5px";
        button.style.padding = "5px";
        button.style.cursor = "pointer";
        button.style.border = "none";
        button.style.background = "#007bff";
        button.style.color = "white";
        button.style.borderRadius = "5px";
        
        button.onclick = function() {
            addMessage("user", option);
            addMessage("bot", "Please provide your contact number.");
            chatStage = 4;
        };
        chatMessages.appendChild(button);
    });
}

function handleChat(userMessage) {
    switch (chatStage) {
        case 1:
            addMessage("bot", "We only offer job opportunities. Would you like to know more?");
            chatStage = 2;
            break;
        case 2:
            addMessage("bot", "Please select a job option:");
            addJobOptions();
            chatStage = 3;
            break;
        case 3:
            // Wait for the user to click on a job option
            break;
        case 4:
            if (/^\d{10}$/.test(userMessage)) {
                addMessage("bot", "Thank you! We will contact you soon.");
                setTimeout(() => {
                    chatbox.style.display = "none";  // Close chat automatically
                }, 2000);
            } else {
                addMessage("bot", "Please enter a valid 10-digit phone number.");
            }
            break;
    }
}