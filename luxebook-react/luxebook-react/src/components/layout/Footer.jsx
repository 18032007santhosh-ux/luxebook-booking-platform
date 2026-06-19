import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-20 border-t border-gold/20 mt-auto relative overflow-hidden">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      <div className="max-w-container-max mx-auto px-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Story */}
          <div className="md:col-span-1 space-y-6">
            <div className="font-headline-md text-3xl text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-gold">diamond</span>
              <span className="uppercase tracking-widest">LuxeBook</span>
            </div>
            <p className="text-body-md text-on-surface-variant/80 leading-relaxed">
              Curating the world's most extraordinary experiences for those who expect nothing less than perfection. The pinnacle of personal service.
            </p>
            {/* Trust Indicators */}
            <div className="flex gap-4 pt-2">
              <span className="material-symbols-outlined text-gold opacity-80" title="Secure Booking">verified_user</span>
              <span className="material-symbols-outlined text-gold opacity-80" title="24/7 Concierge">support_agent</span>
              <span className="material-symbols-outlined text-gold opacity-80" title="Global Excellence">public</span>
            </div>
          </div>

          {/* Concierge Contact Block */}
          <div className="space-y-6">
            <h4 className="font-display-lg text-lg text-primary border-b border-gold/20 pb-2 inline-block">Concierge</h4>
            <ul className="space-y-4 text-body-md text-on-surface-variant/80">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold text-sm">phone_in_talk</span>
                <a href="tel:+18005550199" className="hover:text-primary transition-colors">+1 (800) LUXE-VIP</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold text-sm">mail</span>
                <a href="mailto:concierge@luxebook.com" className="hover:text-primary transition-colors">concierge@luxebook.com</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold text-sm">location_on</span>
                <span>Fifth Avenue, New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Legal / Links */}
          <div className="space-y-6">
            <h4 className="font-display-lg text-lg text-primary border-b border-gold/20 pb-2 inline-block">Explore</h4>
            <ul className="space-y-3 font-label-caps text-label-caps text-on-surface-variant/80">
              <li><a className="hover:text-gold transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Privacy Policy coming soon."); }}>Privacy Policy</a></li>
              <li><a className="hover:text-gold transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Terms of Service coming soon."); }}>Terms of Service</a></li>
              <li><a className="hover:text-gold transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Corporate portal coming soon."); }}>Corporate & Events</a></li>
              <li><a className="hover:text-gold transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Press page coming soon."); }}>Press & Media</a></li>
            </ul>
          </div>

          {/* Premium Newsletter */}
          <div className="md:col-span-1 space-y-6">
            <h4 className="font-display-lg text-lg text-primary border-b border-gold/20 pb-2 inline-block">The Inner Circle</h4>
            <p className="text-body-md text-on-surface-variant/80">
              Subscribe to receive curated experiences and exclusive invitations.
            </p>
            <div className="flex border-b border-on-surface-variant/30 focus-within:border-gold transition-colors pb-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-none outline-none flex-grow text-body-md text-on-surface placeholder:text-on-surface-variant/50"
              />
              <button 
                onClick={() => toast.success("Welcome to the Inner Circle.")}
                className="text-gold font-label-caps hover:text-primary transition-colors uppercase text-sm tracking-wider"
              >
                Join
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-gold cursor-pointer transition-colors">photo_camera</span>
              <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-gold cursor-pointer transition-colors">play_circle</span>
              <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-gold cursor-pointer transition-colors">article</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-on-surface/50">
          <div>© {new Date().getFullYear()} LuxeBook. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-gold">workspace_premium</span>
            <span>Awarded Best Luxury Booking Platform 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
