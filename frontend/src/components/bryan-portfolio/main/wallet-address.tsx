import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTimeRangeContext } from "@/hooks/time-range-context";

// Helper function to fetch user profile using the token from localStorage
const fetchUserProfile = async () => {
  const token = localStorage.getItem("jwtToken");  // Using the correct key
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const res = await fetch("http://localhost:3000/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      console.error("Failed to fetch profile", res.status);
      return null;
    }
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
};

export const ShowWalletAdress: React.FC = () => {
  const { selectedCrypto } = useTimeRangeContext();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Common style string
  const style = `text-[#F0E7A1] hover:bg-[#F0E7A1]/20 hover:text-white hover:-translate-y-2 transition duration-300 bg-black border border-white/20`;

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUserProfile();
      if (user) {
        // Update this line if your API returns the wallet id under a different property
        setWalletAddress(user.wAddress);
      }
    };
    loadUser();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={style}>
          Wallet Address
        </Button>
      </PopoverTrigger>
      <PopoverContent className={style}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-lg font-medium leading-none">
              W4LLET ADDRESS:
            </h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label>
                {walletAddress ? walletAddress : "Loading..."}
              </Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
