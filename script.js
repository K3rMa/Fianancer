// ============================================================================
// 🔴 STEP 1: REPLACE THIS SECTION WITH YOUR CUSTOM AGENT/WORKFLOW RESPONSES
// ============================================================================
// 
// Currently this is placeholder. To integrate your own chat agent/workflow:
// 1. Delete or comment out the aiResponses object below
// 2. Remove the detectTopic() function entirely
// 3. Replace the getAIResponse() function (see STEP 2 below)
//
// You can keep this placeholder for reference during development.
// ============================================================================

const aiResponses = {
    // PLACEHOLDER - TO BE REPLACED WITH YOUR CUSTOM AGENT
    default: [
        "⚠️ Please configure your custom chat agent/workflow in script.js"
    ]
};

// ============================================================================
// 🔴 STEP 2: REPLACE THIS FUNCTION WITH YOUR CUSTOM AGENT/WORKFLOW
// ============================================================================
//
// HOW TO REPLACE THIS:
//
// Option A: If using a backend API/service:
// ───────────────────────────────────────
// async function getAIResponse(userInput) {
//     try {
//         const response = await fetch('YOUR_AGENT_ENDPOINT', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ message: userInput })
//         });
//         const data = await response.json();
//         return data.response;  // Return agent response
//     } catch (error) {
//         return "Error connecting to agent. Please try again.";
//     }
// }
//
// Option B: If using a workflow engine (e.g., n8n, Make, Zapier):
// ──────────────────────────────────────────────────────────────
// async function getAIResponse(userInput) {
//     const response = await fetch('YOUR_WORKFLOW_WEBHOOK_URL', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: userInput })
//     });
//     const data = await response.json();
//     return data.output;  // Your workflow's output field
// }
//
// Option C: If using OpenAI/Claude/other LLM:
// ───────────────────────────────────────────
// async function getAIResponse(userInput) {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer YOUR_API_KEY`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             model: 'gpt-4',
//             messages: [{ role: 'user', content: userInput }]
//         })
//     });
//     const data = await response.json();
//     return data.choices[0].message.content;
// }
//
// IMPORTANT NOTES:
// - The function MUST be named getAIResponse(userInput)
// - It can be async or synchronous
// - It MUST return a string (the agent's response)
// - Update the delay time in sendMessage() if needed (see STEP 3)
// ============================================================================

function getAIResponse(userInput) {
    // 🔴 TODO: REPLACE THIS ENTIRE FUNCTION WITH YOUR CUSTOM AGENT LOGIC
    
    // PLACEHOLDER - Returns error message
    return "⚠️ Please configure your custom chat agent/workflow. See comments in script.js for instructions.";
}

// Function to send message
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (userInput.value.trim() === '') return;
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerHTML = `<p>${escapeHtml(userInput.value)}</p>`;
    chatMessages.appendChild(userMessageDiv);
    
    // Clear input
    const userText = userInput.value;
    userInput.value = '';
    
    // 🔴 STEP 3: ADJUST THIS DELAY IF NEEDED
    // ═══════════════════════════════════════
    // The 500ms delay simulates a realistic response time
    // If using an async agent, increase this or use Promise handling:
    //
    // ❌ DON'T DO THIS (if getAIResponse is async):
    // setTimeout(() => {
    //     const aiResponse = getAIResponse(userText);
    //
    // ✅ DO THIS INSTEAD:
    // (async () => {
    //     const aiResponse = await getAIResponse(userText);
    //     // ... rest of code
    // })();
    // ═══════════════════════════════════════
    
    setTimeout(() => {
        const aiResponse = getAIResponse(userText);
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.innerHTML = `<p>${aiResponse}</p>`;
        chatMessages.appendChild(botMessageDiv);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);  // 🔴 MODIFY THIS VALUE IF NEEDED (in milliseconds)
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Function to scroll to chat section
function scrollToChat() {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize chat with welcome message if empty
window.addEventListener('load', function() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 0) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message bot-message';
        welcomeDiv.innerHTML = '<p>👋 Hi! I\'m FinWise AI. Ask me anything about budgeting, saving, investing, or managing debt. How can I help you today?</p>';
        chatMessages.appendChild(welcomeDiv);
    }
});
