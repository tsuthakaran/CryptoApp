"use client";
import * as React from "react";

export const LiveChat: React.FC = () => {
const [isChatStarted, setIsChatStarted] = React.useState(false);
const [messages, setMessages] = React.useState<Array<{ text: string; isUser: boolean }>>([]);
const [newMessage, setNewMessage] = React.useState("");

const handleStartChat = () => {
    setIsChatStarted(true);
    setMessages([{ text: "Welcome to W4LLET Live Chat! How can we help you today?", isUser: false }]);
};

const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {

    setMessages(prev => [...prev, { text: newMessage, isUser: true }]);
    setNewMessage("");
    
    setTimeout(() => {
        setMessages(prev => [...prev, { 
        text: "Thank you for your message. Our support team will respond shortly.", 
        isUser: false 
        }]);
    }, 1000);
    }
};

return (
    <div className="flex flex-col h-full">
    {!isChatStarted ? (
        <div className="flex items-center justify-center h-full">
        <button
            onClick={handleStartChat}
            className="px-8 py-4 bg-black text-[#F0E7A1] rounded-lg text-xl font-semibold hover:bg-neutral-800 transition-colors"
        >
            Start Live Chat
        </button>
        </div>
    ) : (
        <div className="flex flex-col h-full">
          {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
            <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
                <div
                className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser
                    ? 'bg-black text-[#F0E7A1]'
                    : 'bg-neutral-200 text-neutral-800'
                }`}
                >
                {message.text}
                </div>
            </div>
            ))}
        </div>

          {/* Input area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-[#F0E7A1] rounded-lg hover:bg-neutral-800 transition-colors"
            >
                Send
            </button>
            </div>
        </form>
        </div>
    )}
    </div>
);
}; 