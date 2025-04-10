"use client";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const style = "text-[#F0E7A1] text-2xl font-light hover:text-[#F0E7A1]/80 transition-colors"

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-8 bg-black h-[80px]">

      <Button className={style}>
        
      <Link 
        to="/Portfolio" 
      >
        W4LLET
      </Link>
      </Button>

      <div className="flex items-center gap-6">
        <Link 
          to="/Settings" 
          className="text-[#F0E7A1] text-xl font-light hover:text-[#F0E7A1]/80 transition-colors"
        >
          Settings
        </Link>
        
        <div className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
          <span className="text-black text-lg">👤</span>
        </div>
      </div>
    </header>
  );
};