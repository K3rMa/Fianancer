// Sample responses for the chatbot - in a real application, this would connect to an AI backend
const aiResponses = {
    // General greeting and navigation
    greeting: [
        "Hello! I'm FinWise AI, your personal financial advisor. How can I help you today?",
        "Hi there! 👋 I'm here to help with your financial questions. What would you like to know?",
        "Welcome! I'm FinWise AI. Ask me anything about budgeting, saving, investing, or managing debt."
    ],
    
    // Budgeting responses
    budgeting: [
        "Great question! Start by tracking your income and expenses for a month. Then, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
        "The best budgeting method depends on your lifestyle. Popular options include: 1) 50/30/20 Rule, 2) Zero-Based Budgeting, or 3) The Envelope Method. Which interests you?",
        "Budgeting is about being intentional with your money. The key steps are: calculate income → list expenses → categorize them → set limits → track regularly.",
        "Would you like help with creating a budget? I can guide you through the 50/30/20 rule, which is perfect for beginners!"
    ],
    
    // Saving responses
    saving: [
        "The best way to save is to 'pay yourself first'—set up automatic transfers on payday, even if it's just $25-50. This removes the temptation to spend it.",
        "Building an emergency fund is crucial! Aim for 3-6 months of living expenses. Start small—even $500 provides protection against minor emergencies.",
        "Consider keeping your savings in a high-yield savings account (currently 4-5% APY). This earns you interest while keeping the money accessible.",
        "Use the sinking funds method: create separate savings pots for specific goals (vacation, emergency, car repair). This makes saving more motivating!"
    ],
    
    // Investing responses
    investing: [
        "Great question! Most beginners should start with index funds (like an S&P 500 index fund) for diversification and low costs. They offer excellent long-term growth potential.",
        "The best time to start investing is now! Even small amounts matter due to compound growth. A $100/month investment at age 25 can grow to $625,000+ by age 65.",
        "First, make sure you have: 1) Emergency fund (3-6 months), 2) High-interest debt paid off. Then open a brokerage account and start with index funds.",
        "Investment basics: diversify your portfolio, think long-term, keep costs low (aim for 0.1-0.3% expense ratios), and don't panic sell during downturns."
    ],
    
    // Debt & Credit responses
    debt: [
        "Good question! Build credit by: 1) Getting a credit card, 2) Using it responsibly (paying on time), 3) Keeping balances low (<30% of limit), 4) Never closing old accounts.",
        "Your credit score has 5 components: Payment History (35%), Credit Utilization (30%), Length of Credit (15%), Credit Mix (10%), New Credit (10%). Focus on paying on time!",
        "To pay off debt, try either: 1) Snowball Method (pay off smallest debts first for motivation), or 2) Avalanche Method (pay highest interest first to save money).",
        "Debt isn't inherently bad—good debt (student loans, mortgages) invests in your future. Bad debt (high-interest credit cards) doesn't. Focus on eliminating bad debt first."
    ],
    
    // Default response for unclear questions
    default: [
        "That's a great question! Could you give me a bit more detail? Are you interested in budgeting, saving, investing, or managing debt?",
        "I want to give you the best answer! Are you asking about budgeting, saving, investing, debt, or credit?",
        "I can help with that! Which financial topic interests you most: budgeting, saving, investing, or debt & credit management?"
    ]
};

// Function to detect topic from user input
function detectTopic(userInput) {
    const input = userInput.toLowerCase();
    
    if (input.includes('budget') || input.includes('expense') || input.includes('spend')) {
        return 'budgeting';
    } else if (input.includes('save') || input.includes('emergency') || input.includes('high-yield')) {
        return 'saving';
    } else if (input.includes('invest') || input.includes('stock') || input.includes('fund') || input.includes('growth') || input.includes('401k') || input.includes('ira')) {
        return 'investing';
    } else if (input.includes('debt') || input.includes('credit') || input.includes('loan') || input.includes('credit card') || input.includes('credit score')) {
        return 'debt';
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('help')) {
        return 'greeting';
    }
    return 'default';
}

// Function to get AI response
function getAIResponse(userInput) {
    const topic = detectTopic(userInput);
    const responses = aiResponses[topic];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
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
    
    // Simulate AI response delay
    setTimeout(() => {
        const aiResponse = getAIResponse(userText);
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.innerHTML = `<p>${aiResponse}</p>`;
        chatMessages.appendChild(botMessageDiv);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
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
