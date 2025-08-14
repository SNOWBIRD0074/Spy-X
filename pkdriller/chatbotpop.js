    if (response) {
        await sock.sendMessage(chatId, {
            text: `🧠 *RAHEEM-XMD Bot Replied:*\n\n${response}\n\n💡 _AI Powered by raheem Official_`
        }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, {
            text: '⚠️ I tried, but couldn’t understand that. Try rephrasing your message.',
            quoted: message
        });
    }
}

async function getAIResponse(userMessage, context) {
    try {
        const prompt = `User: ${userMessage}\n\nChat history:\n${context.messages.join('\n')}`;
        const res = await fetch("https://api.dreaded.site/api/chatgpt?text=" + encodeURIComponent(prompt));
        const json = await res.json();
        return json.result?.prompt || null;
    } catch (e) {
        return null;
    }
}

module.exports = {
    handleChatbotCommand,
    handleChatbotResponse
};
