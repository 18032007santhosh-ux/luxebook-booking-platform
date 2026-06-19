import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatedNavigationTabs } from "../ui/AnimatedNavigationTabs";
import { useAuth } from "../../contexts/AuthContext";
import { membershipService } from "../../services/membershipService";

const BASE_NAV_ITEMS = [
  { id: 1, title: "Home", path: "/home" },
  { id: 2, title: "Services", path: "/explore" },
  { id: 3, title: "Gallery", path: "/gallery" },
  { id: 4, title: "Appointments", path: "/appointments" },
  { id: 5, title: "Membership", path: "/membership" },
  
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin" || user?.email === "admin@gmail.com";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derive nav items based on auth state — Dashboard for members only
  const navItems = isAuthenticated
    ? [...BASE_NAV_ITEMS, { id: 6, title: "Dashboard", path: "/membership/dashboard" }]
    : BASE_NAV_ITEMS;

  const hasActiveMembership = membershipService.getActiveMembership() !== null;
  const targetRoute = isAuthenticated
    ? (hasActiveMembership ? "/membership/dashboard" : "/membership")
    : "/membership";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-[#121212]/80 backdrop-blur-xl shadow-luxury py-2 border-b border-gold/20' : 'bg-transparent py-4'}`}>
      {/* Scroll progress bar */}
      <div className="w-full h-1 bg-transparent absolute top-0 left-0">
        <div className="h-full bg-gold/50" style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}></div>
      </div>

      <div className="flex items-center w-full max-w-container mx-auto px-8">
        {/* Brand logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/home" className={`font-headline-md font-semibold tracking-widest transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-primary drop-shadow-md'} flex items-center gap-2`}>
            <span className="material-symbols-outlined text-gold text-3xl">diamond</span>
            <span className="text-2xl uppercase tracking-[0.2em]">LuxeBook</span>
          </Link>
        </div>

        {/* Desktop navigation tabs */}
        <div className="hidden md:flex flex-none justify-center">
          <AnimatedNavigationTabs items={navItems} />
        </div>

        {/* Right-side action area */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Ghost Login CTA — only shown to unauthenticated users */}
          {!isAuthenticated && (
            <Link to="/login">
              <button
                className="hidden md:block font-label-caps text-label-caps text-primary/80 hover:text-gold border border-outline-variant/30 px-5 py-2 rounded-full hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                aria-label="Login to your LuxeBook account"
              >
                Login
              </button>
            </Link>
          )}

          {/* Primary CTA — Join The Club / Membership Dashboard */}
          <Link to={targetRoute}>
            <button
              className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2 rounded-full border border-primary/20 hover:bg-primary-container hover:text-on-primary-container hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              Join The Club
            </button>
          </Link>

          {/* Admin sees original hamburger menu */}
          {isAdmin && (
            <span className="material-symbols-outlined text-primary cursor-pointer hover:text-gold transition-colors text-3xl">menu</span>
          )}

          {/* Logout Button — only shown to authenticated normal users */}
          {isAuthenticated && !isAdmin && (
            <button
              onClick={handleLogout}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-error border border-outline-variant/30 px-5 py-2 rounded-full hover:border-error/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:bg-error/5 transition-all duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-error flex items-center gap-2"
              aria-label="Logout of your account"
            >
              <span className="material-symbols-outlined text-sm hidden md:inline-block">logout</span>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
