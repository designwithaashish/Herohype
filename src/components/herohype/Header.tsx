
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setIsLoggedIn(true);
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "admin");
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header className="bg-[rgba(15,16,20,1)] flex h-[80px] w-full items-center gap-[40px_100px] font-normal justify-between flex-wrap px-6 md:px-10 lg:px-20 py-5 max-md:max-w-full">
      <Link to="/" className="flex items-center whitespace-nowrap text-center tracking-[-0.5px] leading-[1.1] justify-center my-auto h-[32px]">
        <img
          src="/lovable-uploads/ce7e4c9b-fa03-4aba-aaad-b8701b7a87eb.png"
          className="h-[32px]"
          alt="herohype logo"
        />
      </Link>

      <nav className="flex items-center gap-10 text-[15px] text-white font-medium justify-center my-auto">
        {isLoggedIn && (
          <Link
            to="/submit"
            className="hover:text-gray-300 transition-colors font-satoshi"
          >
            Submit
          </Link>
        )}
        
        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-gray-300 transition-colors font-satoshi"
          >
            Admin
          </Link>
        )}
        
        <Link
          to="/about"
          className="hover:text-gray-300 transition-colors font-satoshi"
        >
          About
        </Link>
      </nav>

      <div className="flex gap-3 text-[22px] text-center leading-[1.2] justify-center my-auto">
        {isLoggedIn ? (
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors font-satoshi"
          >
            Logout
          </Button>
        ) : (
          <Button 
            onClick={() => navigate("/login")}
            className="bg-[rgba(183,255,29,1)] text-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] gap-2.5 px-5 py-3 rounded-lg hover:bg-[rgba(163,235,9,1)] transition-colors font-satoshi"
          >
            Login / Sign up
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
