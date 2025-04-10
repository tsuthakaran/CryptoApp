

"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


export const Sidebar: React.FC = () => {

return (
    <aside className="flex flex-col bg-gray-200 w-64 h-screen">
    <header className="flex gap-3 items-center px-8 bg-black h-[80px]">
    <div className="navbar bg-black shadow-sm text-4xl" >
    <Link to="/Portfolio" className="text-[#F0E7A1] text-4xl">
        <h1>W4LLET</h1>
    </Link>


    </div>
    </header>
    <nav className="flex flex-col p-4 space-y-2">
        {/* FAQ */}
        <button className="text-xl text-black py-2 px-4 rounded-md bg-gray-300 cursor-default">
        FAQ
        </button>
        
        {/* Other buttons */}
        {["Live chat", "Chatbot", "Feedback"].map((item) => (
        <Button variant="ghost" className="button text-xl text-black py-2 px-4 rounded-md transition-colors hover:bg-gray-400">
            <Link to={"/" + item.toLowerCase()}>
                {item}
            </Link>
        </Button>
        ))}
    </nav>
    </aside>
);
};
