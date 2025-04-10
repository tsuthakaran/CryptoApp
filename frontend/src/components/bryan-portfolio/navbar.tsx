import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

const NavBarPortfolio: React.FC = () => {
    const navButtonStyle = `font-sans 
                            font-weight-thin 
                            text-xl 
                            text-[#F0E7A1]
                            m-2
                            rounded-sm 
                            btn-soft 
                            md:subpixel-antialiased 
                            hover:bg-[#F0E7A1] 
                            hover:text-[#1A1A1A]
                            transition 
                            delay-150 
                            duration-100
                            ease-in-out 
                            hover:-translate-y-1`

    return (
        
        <div className="navbar bg-black shadow-sm text-[#F0E7A1] text-xl" >
            {/*left side*/}
            <div className="m-2 flex-1">
                <Button variant="ghost" className={navButtonStyle}>
                    <Link to="/Portfolio"> W4LLET</Link>
                </Button>
            </div>
            {/*right side*/}
            <div className="flex gap-10">
                <Button variant="ghost" className={navButtonStyle}>
                    <Link to="/CryptoAnalysis?">Crypto Analysis</Link>
                </Button>
                <Button variant="ghost" className={navButtonStyle}>
                    <Link to="/Settings">Settings</Link>
                </Button>
            </div>
        </div>
  );
}

export default NavBarPortfolio;