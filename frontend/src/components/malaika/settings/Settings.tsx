"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Link } from "react-router-dom";

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState("profile");
  const [profileType, setProfileType] = React.useState("general");
  const [email, setEmail] = React.useState("user@example.com");
  const [isEditing, setIsEditing] = React.useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = React.useState(false);
  const [notificationPreferences, setNotificationPreferences] = React.useState({
    newsUpdates: true,
    withdrawals: true,
    deposits: true
  });
  const [profilePicture, setProfilePicture] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);


  const settingsSections = [
    { 
      id: "profile", 
      title: "Profile", 
      content: (
        <div className="space-y-6">
          {/* Profile Picture Section */}
          {/* Profile Picture Section */}
<div className="flex items-center space-x-4">
  <div className="relative">
    <div className="w-24 h-24 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center">
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <span className="text-3xl text-neutral-500">👤</span>
      )}
    </div>
    <button
      onClick={() => fileInputRef.current?.click()}
      className="absolute bottom-0 right-0 bg-black text-[#F0E7A1] p-2 rounded-full hover:bg-neutral-800 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    </button>
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfilePicture(imageUrl);
        }
      }}
      className="hidden"
    />
  </div>
  <div>
    <h3 className="text-lg font-medium text-neutral-800">Profile Picture</h3>
    <p className="text-sm text-neutral-500">Upload a new profile picture</p>
  </div>
</div>


          {/* Profile Type Section */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800 mb-3">Profile Type</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setProfileType("general")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  profileType === "general"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-neutral-200 hover:border-yellow-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-medium text-neutral-800">General User</div>
                </div>
              </button>
              <button
                onClick={() => setProfileType("trader")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  profileType === "trader"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-neutral-200 hover:border-yellow-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-medium text-neutral-800">Trader</div>
                </div>
              </button>
              <button
                onClick={() => setProfileType("institutional")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  profileType === "institutional"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-neutral-200 hover:border-yellow-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="font-medium text-neutral-800">Institutional Trader</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-800">Contact Information</h3>
              
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-neutral-100"
                  />
                  
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-black text-[#F0E7A1] rounded-lg hover:bg-neutral-800 transition-colors">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    { 
      id: "security", 
      title: "Security & Privacy", 
      content: (
        <div className="space-y-6">
          {/* Two-Factor Authentication Section */}
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">Two-Factor Authentication</h3>
                <p className="text-sm text-neutral-500 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  is2FAEnabled
                    ? "bg-black text-[#F0E7A1] "
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {is2FAEnabled ? "Enabled" : "Enable"}
              </button>
            </div>
            
            {is2FAEnabled && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Email Verification</p>
                    <p className="text-sm text-neutral-500">Receive a verification code via email</p>
                  </div>
                </div>
                
                
              </div>
            )}
          </div>

          
        </div>
      )
    },
    { 
      id: "notifications", 
      title: "Notifications", 
      content: (
        <div className="space-y-6">
          {/* News and Updates Section */}
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">News and Updates</h3>
                <p className="text-sm text-neutral-500 mt-1">Stay informed about W4LLET updates and market news</p>
              </div>
              <button
                onClick={() => setNotificationPreferences(prev => ({
                  ...prev,
                  newsUpdates: !prev.newsUpdates
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationPreferences.newsUpdates ? 'bg-yellow-500' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationPreferences.newsUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {notificationPreferences.newsUpdates && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Email Notifications</p>
                    <p className="text-sm text-neutral-500">Receive updates at {email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Product Updates</p>
                    <p className="text-sm text-neutral-500">Get notified about new features and improvements</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Alerts Section */}
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">Transaction Alerts</h3>
                <p className="text-sm text-neutral-500 mt-1">Get notified about your account transactions</p>
              </div>
              <button
                onClick={() => setNotificationPreferences(prev => ({
                  ...prev,
                  withdrawals: !prev.withdrawals,
                  deposits: !prev.deposits
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationPreferences.withdrawals ? 'bg-yellow-500' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationPreferences.withdrawals ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {notificationPreferences.withdrawals && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-3a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V9a1 1 0 00-1-1h-.01zm0 3a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V12a1 1 0 00-1-1h-.01z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Withdrawal Alerts</p>
                    <p className="text-sm text-neutral-500">Get notified when funds are withdrawn from your account</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-3a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V9a1 1 0 00-1-1h-.01zm0 3a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V12a1 1 0 00-1-1h-.01z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Deposit Alerts</p>
                    <p className="text-sm text-neutral-500">Get notified when funds are deposited to your account</p>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 mt-2">
                  All transaction alerts will be sent to {email}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-100">
      {/* Settings Header */}
      <header className="bg-black shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <Button>
            <Link to="/Portfolio">
            <h1 className = "text-[#F0E7A1]">W4LLET</h1> 
            </Link>
          </Button>
          
          <Button>
            <Link to="/CustomerSupport">
            Customer Support
            </Link>
          </Button>
        </div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Settings Sidebar */}
        <aside className="w-64 bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">Settings</h2>
          <nav>
            <ul className="space-y-2">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-black text-[#F0E7A1]"
                        : "text-neutral-800 hover:bg-neutral-100"
                    }`}
                    
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Settings Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-neutral-800">
              {settingsSections.find(s => s.id === activeSection)?.title}
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {settingsSections.find(s => s.id === activeSection)?.content}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}; 