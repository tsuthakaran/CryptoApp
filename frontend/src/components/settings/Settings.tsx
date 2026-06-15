"use client";
import { Logo } from "@/components/ui/logo";
import * as React from "react";
import { Link } from "react-router-dom";
import { SupportSection } from "./SupportSection";
import { auth } from "@/firebase";

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState("profile");
  const email = auth.currentUser?.email ?? "";

  const settingsSections = [
    {
      id: "profile",
      title: "Profile",
      content: (
        <div className="bg-white/3 border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Account</h3>
          <div className="space-y-1.5">
            <label className="block text-sm text-white/50">Email address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm opacity-50"
            />
          </div>
        </div>
      ),
    },
    {
      id: "support",
      title: "Support",
      content: <SupportSection />,
    },
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      <header className="bg-black border-b border-[#F0E7A1]/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/Portfolio">
            <Logo size="sm" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-56 bg-black border-r border-[#F0E7A1]/10 p-4">
          <h2 className="text-xs font-medium text-white/30 uppercase tracking-wider px-3 mb-3">Settings</h2>
          <nav>
            <ul className="space-y-1">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-[#F0E7A1]/15 text-[#F0E7A1]"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6">
              {settingsSections.find((s) => s.id === activeSection)?.title}
            </h2>
            {settingsSections.find((s) => s.id === activeSection)?.content}
          </div>
        </main>
      </div>
    </div>
  );
};
