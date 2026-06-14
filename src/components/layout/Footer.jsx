import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface py-lg border-t border-outline-variant/30 mt-auto">
      <div className="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="font-headline-md text-headline-md text-primary">LuxeBook</div>
        
        <div className="flex flex-wrap justify-center gap-md text-on-surface-variant/80 font-label-caps text-label-caps">
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
          <a className="hover:text-primary transition-colors" href="#">Concierge Access</a>
          <a className="hover:text-primary transition-colors" href="#">Corporate</a>
          <a className="hover:text-primary transition-colors" href="#">Press</a>
        </div>
        
        <div className="font-body-sm text-body-sm text-on-surface/60">
          © 2024 LuxeBook. The Pinnacle of Personal Service.
        </div>
      </div>
    </footer>
  );
}
