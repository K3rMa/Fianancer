// ============================================================================
// DEBT & CREDIT AGENT/WORKFLOW - debt-agent.js
// ============================================================================
//
// This file contains the chat agent/workflow for the DEBT & CREDIT page
// Team Member: [Jovan]
// Last Updated: January 14, 2026
//
// INSTRUCTIONS:
// 1. This file is imported in debt.html - no other changes needed there
// 2. The agent integrates with your n8n workflow via the provided webhook
// 3. Responses are restricted to debt & credit topics only (handled by n8n prompt)
// ============================================================================

/**
 * Main function for Debt & Credit Agent
 * @param {string} userInput - The user's question or input
 * @returns {Promise<string>} - The agent's response
 */
async function getAIResponse(userInput) {
    const webhookUrl = 'https://n8ngc.codeblazar.org/webhook-test/cde1b808-6567-4916-9699-61475929083a';

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: userInput.trim() // Clean up input
            })
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with status ${response.status}`);
        }

        const data = await response.json();

        // Extract the AI response from n8n output
        // Adjust the key below if your n8n webhook returns a different field name
        // Common possibilities: data.output, data.response, data.text, or data.message
        const aiResponse = data.output || data.response || data.text || data.message;

        if (!aiResponse || typeof aiResponse !== 'string') {
            throw new Error('Invalid response format from n8n');
        }

        // Optional: Add a Singapore-specific disclaimer (recommended for compliance)
        const disclaimer = "\n\n**Disclaimer:** This is general information only and not personalized financial advice. Consult a qualified professional or Credit Counselling Singapore (CCS) for advice tailored to your situation.";

        return aiResponse + disclaimer;

    } catch (error) {
        console.error('Debt & Credit Agent Error:', error);
        return "Sorry, I'm having trouble connecting to the debt & credit assistant right now. Please try again later or contact support.";
    }
}



// Export the function for use in debt.html
export { getAIResponse };
