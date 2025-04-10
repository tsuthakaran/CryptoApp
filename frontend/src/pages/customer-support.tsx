import { Button } from "@/components/ui/button";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const CustomerSupportPage: React.FC = () => {
  const style = "text-black text-xl py-2 px-4 rounded-md hover:bg-gray-200 transition-colors";
  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-100">
      {/* Header */}
      <header className="bg-black shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
        <Button>
        <Link to="/Portfolio" >
          <h1 className="text-[#F0E7A1]">W4LLET</h1>
        </Link>
        </Button>
          <a
            href="/settings" 
            className="px-4 py-2 text-[#F0E7A1] hover:[#F0E7A1] transition-colors"
          >
            Settings
          </a>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm">
          <nav className="p-4">
            <ul className="space-y-6">
              <li>
                <Link to="/CustomerSupport" className={style}> FAQs </Link>
              </li>
              <li>
                <Link to="/CustomerSupport/live-chat" className={style}> Live Chat</Link>
              </li>
              <li>
                <Link to="/CustomerSupport/chatbot" className={style}> Chatbot </Link>
              </li>
              <li>
                <Link to="/CustomerSupport/feedback" className={style}> Feedback </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-neutral-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 

export default CustomerSupportPage;
