

"use client";
import * as React from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { MainContent } from "../settings/MainContent";

const InputDesign: React.FC = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-hidden">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default InputDesign;
