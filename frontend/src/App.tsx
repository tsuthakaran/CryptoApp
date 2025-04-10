import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import NavBarLanding from "./components/Jibril/NavBarLanding.tsx";
import LandingPage from "./components/Jibril/LandingPage.tsx";
import Login from "./components/Jibril/Login.tsx";
import Register from "./components/Jibril/Register.tsx";
import { MainContent } from "./components/malaika/settings/MainContent";
import { LiveChat } from "./components/malaika/customer-support/LiveChat";
import { Chatbot } from "./components/malaika/customer-support/Chatbot";
import { Feedback } from "./components/malaika/customer-support/Feedback";
import { Settings } from "./components/malaika/settings/Settings";
import CustomerSupportPage from "./pages/customer-support";
import Transactions from "./pages/Transactions";

import ForgotPassword from "./components/Jibril/Forgot.tsx";
import ResetPassword from "./components/Jibril/Reset.tsx";
import { TimeRangeProvider } from "./hooks/time-range-context.tsx";
import { SidebarCollapsedProvider } from "./hooks/sidebar-context.tsx";
import Portfolio from "./pages/portfolio.tsx";
import CryptoInsights from "./components/varun/CryptoInsights.tsx";
import AdminDashboard from "./components/malaika/admin/AdminDashboard";

const App: React.FC = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <TimeRangeProvider>
        <SidebarCollapsedProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Forgot" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/NavBarLanding" element={<NavBarLanding />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Portfolio?" element={<Portfolio />} />
              <Route path="/CryptoAnalysis" element={<CryptoInsights />} />
              <Route path="/Transaction" element={<Transactions />} />
              <Route path="/CustomerSupport" element={<CustomerSupportPage />}>
                <Route index element={<MainContent />} />
                <Route path="live-chat" element={<LiveChat />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
              <Route path="/Settings" element={<Settings />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
        </SidebarCollapsedProvider>
      </TimeRangeProvider>
    </div>
  );
};
export default App;
