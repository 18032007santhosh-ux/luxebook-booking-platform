import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const getLinkClass = (linkPath) => {
    const base = "font-label-caps text-label-caps tracking-wider transition-colors duration-300 ";
    if (path === linkPath) {
      return base + "text-primary border-b-2 border-primary pb-1";
    }
    return base + "text-on-surface/70 hover:text-primary";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-black/20 backdrop-blur-xl z-50 border-b border-white/20 shadow-md flex justify-between items-center w-full px-xl max-w-container-max mx-auto">
      <Link to="/home" className="font-headline-md text-headline-md font-semibold tracking-tight text-primary">
        LuxeBook
      </Link>
      
      <div className="hidden md:flex items-center gap-lg">
        <Link className={getLinkClass("/home")} to="/home">
          Concierge
        </Link>
        <Link className={getLinkClass("/explore")} to="/explore">
          Wellness
        </Link>
        <Link className={getLinkClass("/book")} to="/book">
          Appointments
        </Link>
        <Link className={getLinkClass("/login")} to="/login">
          Membership
        </Link>
      </div>

      <div className="flex items-center gap-md">
        <Link to="/login">
          <button className="bg-primary text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-full scale-95 active:scale-90 transition-transform hover:shadow-lg">
            Join Club
          </button>
        </Link>
        <span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
      </div>
    </nav>
  );
}
