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
    addMessage("AI", "Hello! How can I help you?");
});

// Enter key button
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        chatSend.click(); 
    }
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
    if (sender === "AI") {
        text = "🤖 AI: " + text;
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
            addMessage("AI", "Please provide your contact number.");
            chatStage = 4;
        };
        chatMessages.appendChild(button);
    });
}

function handleChat(userMessage) {
    switch (chatStage) {
        case 1:
            addMessage("AI", "We only offer job opportunities. Would you like to know more?");
            chatStage = 2;
            break;
        case 2:
            addMessage("AI", "Please select a job option:");
            addJobOptions();
            chatStage = 3;
            break;
        case 3:
            // Wait for the user to click on a job option
            break;
        case 4:
            if (/^\d{10}$/.test(userMessage)) {
                addMessage("AI", "Thank you! We will contact you soon.");
                setTimeout(() => {
                    chatbox.style.display = "none";  // Close chat automatically
                }, 2000);
            } else {
                addMessage("AI", "Please enter a valid 10-digit phone number.");
            }
            break;
    }
}

/*smoot*/
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, /* Adjusts for fixed navbar */
                    behavior: "smooth"
                });
            }
        });
    });
});
