"use client";
import * as React from "react";

export const MainContent: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = React.useState<{
    question: string;
    answer: string;
  } | null>(null);

  const sections = [
    { 
      title: "Getting Started", 
      hasBlueSubheading: false,
      subheadings: [
        {
          question: "How do I create my first cryptocurrency wallet?",
          answer: "To create your first cryptocurrency wallet, follow these steps:\n\n1. Download our W4LLET app from the official store\n2. Click 'Create New Wallet'\n3. Set up a strong password and 2FA\n4. Save your recovery phrase securely\n5. Verify your email address\n\nRemember: Never share your recovery phrase with anyone!"
        },
        {
          question: "What are the basic security measures I should take?",
          answer: "Essential security measures for your crypto wallet:\n\n1. Enable two-factor authentication (2FA)\n2. Use a strong, unique password\n3. Keep your recovery phrase offline and secure\n4. Never share private keys or recovery phrases\n5. Regularly update the app\n6. Use hardware wallet for large amounts\n7. Be cautious of phishing attempts"
        }
      ]
    },
    { 
      title: "Risks", 
      hasBlueSubheading: false,
      subheadings: [
        {
          question: "What are the main risks of cryptocurrency trading?",
          answer: "Key risks in cryptocurrency trading include:\n\n1. Market Volatility: Prices can change dramatically\n2. Regulatory Changes: New laws may affect trading\n3. Security Risks: Hacking and theft possibilities\n4. Technical Risks: Network issues or bugs\n5. Liquidity Risks: Difficulty in selling assets\n6. Scam Risks: Fraudulent schemes and fake tokens\n\nAlways do thorough research before investing."
        },
        {
          question: "How can I protect my investments from market volatility?",
          answer: "Strategies to manage market volatility:\n\n1. Diversify your portfolio across different assets\n2. Use dollar-cost averaging (regular small investments)\n3. Set stop-loss orders to limit potential losses\n4. Keep emergency funds separate from investments\n5. Don't invest more than you can afford to lose\n6. Stay informed about market trends\n7. Consider long-term holding strategies"
        }
      ]
    },
  ];

  return (
    <div className="flex h-full">
      <section className="flex-1 p-6 overflow-y-auto bg-neutral-200">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-3xl mb-4">{section.title}</h2>
            {section.subheadings && section.subheadings.map((subheading, index) => (
              <div 
                key={index} 
                className="mb-4 cursor-pointer hover:bg-neutral-300 p-4 rounded-lg transition-colors"
                onClick={() => setSelectedFAQ(subheading)}
              >
                <p className="text-xl">
                  {subheading.question}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <aside className="p-6 bg-neutral-100 w-[539px] max-md:w-[400px] max-sm:w-full overflow-y-auto">
        <div className="h-full overflow-y-auto">
          {selectedFAQ ? (
            <>
              <h2 className="mb-6 text-3xl">{selectedFAQ.question}</h2>
              <div className="text-lg text-neutral-800 whitespace-pre-line">
                {selectedFAQ.answer}
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-6 text-3xl">FAQ Details</h2>
              <p className="text-lg text-neutral-600">Select a question from the left to view its answer.</p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};
