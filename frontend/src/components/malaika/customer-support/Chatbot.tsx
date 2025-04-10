"use client";
import * as React from "react";

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = React.useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Welcome to W4LLET Chatbot! Please select your query by entering the corresponding number:\n\n1. How do I create a wallet?\n2. How do I send cryptocurrency?\n3. How do I receive cryptocurrency?\n4. What are the transaction fees?\n5. How do I secure my wallet?\n6. What cryptocurrencies do you support?\n7. How do I reset my password?\n8. Contact Support", isUser: false }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isWaitingForNumber, setIsWaitingForNumber] = React.useState(true);

  const responses = {
    "1": "To create a wallet:\n1. Click 'Create New Wallet'\n2. Set up a strong password\n3. Save your recovery phrase securely\n4. Verify your email\n\nRemember: Never share your recovery phrase!",
    "2": "To send cryptocurrency:\n1. Click 'Send' in your wallet\n2. Enter recipient's address\n3. Enter amount to send\n4. Review transaction details\n5. Confirm the transaction",
    "3": "To receive cryptocurrency:\n1. Click 'Receive' in your wallet\n2. Share your wallet address or QR code\n3. Wait for sender to complete the transaction\n4. Funds will appear in your wallet",
    "4": "Our transaction fees vary by cryptocurrency:\n- Bitcoin: 0.0001 BTC\n- Ethereum: 0.001 ETH\n- Other tokens: Network fee + 0.1%\n\nFees are displayed before confirming transactions.",
    "5": "To secure your wallet:\n1. Enable 2FA\n2. Use a strong password\n3. Keep recovery phrase offline\n4. Never share private keys\n5. Regular security updates",
    "6": "We support:\n- Bitcoin (BTC)\n- Ethereum (ETH)\n- USDT\n- USDC\n- And many more ERC-20 tokens",
    "7": "To reset your password:\n1. Click 'Forgot Password'\n2. Enter your email\n3. Follow the reset link\n4. Create new password\n5. Verify with 2FA",
    "8": "For support:\n1. Email: support@w4llet.com\n2. Live chat available 24/7\n3. Phone: +1 (555) 123-4567\n\nOur team typically responds within 24 hours."
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);

    if (isWaitingForNumber) {
      const response = responses[inputValue as keyof typeof responses];
      if (response) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: response, isUser: false }]);
        }, 500);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Invalid option. Please enter a number between 1 and 8.", 
            isUser: false 
          }]);
        }, 500);
      }
    }

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg whitespace-pre-line ${
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

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your choice (1-8)..."
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
  );
}; 