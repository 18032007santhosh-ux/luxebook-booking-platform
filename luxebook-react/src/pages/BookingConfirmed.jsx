import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Magnet from "../components/ui/Magnet";

export default function BookingConfirmed() {
  useEffect(() => {
    // Confetti burst on load
    const container = document.body;
    const confettiElements = [];

    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = Math.random() * 2 + 2;
      const color = ["#D4AF37", "#0F5E4D", "#E8C9B0"][Math.floor(Math.random() * 3)];

      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}%`;
      confetti.style.top = `-20px`;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

      container.appendChild(confetti);
      confettiElements.push(confetti);

      confetti.animate([
        { transform: "translateY(0) rotate(0)", opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        fill: "forwards"
      });
    }

    return () => {
      confettiElements.forEach(el => {
        if (container.contains(el)) el.remove();
      });
    };
  }, []);

  return (
    <div className="font-body-md text-on-surface bg-[#F8F5F0] min-h-screen">
      {/* Subtle Background Highlights */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[0%] -left-[10%] w-[50%] h-[50%] rounded-full bg-tertiary-fixed-dim/10 blur-[100px]"></div>
      </div>

      {/* Main Content Wrapper */}
      <main className="min-h-screen flex flex-col items-center justify-center py-xl px-md max-w-container-max mx-auto relative">
        
        {/* Hero Section */}
        <section className="text-center mb-lg relative">
          <div className="success-float inline-flex items-center justify-center w-32 h-32 rounded-full glass-card mb-md border-2 border-tertiary-container/30">
            <span className="material-symbols-outlined text-[64px] gold-shimmer" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-xs">Your Journey Awaits</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Your reservation at the sanctuary has been confirmed. We are preparing for your arrival.
          </p>
        </section>

        {/* Booking Details Card */}
        <div className="w-full max-w-2xl glass-card rounded-[24px] p-lg md:p-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tertiary-container to-transparent opacity-40"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
            {/* Details */}
            <div className="space-y-md">
              <div className="space-y-xs">
                <span className="font-label-caps text-label-caps text-tertiary uppercase">Service</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Royal Thai Massage</h2>
              </div>
              <div className="space-y-sm">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <span className="font-body-md text-body-md">Expert: <span className="font-semibold text-primary">Elena S. Volkov</span></span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-body-md text-body-md">Friday, October 24, 2024</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span className="font-body-md text-body-md">4:30 PM — 6:00 PM (90 min)</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-body-md text-body-md">The Zen Suite, Floor 42</span>
                </div>
              </div>
            </div>
            
            {/* QR Code & Digital Pass */}
            <div className="flex flex-col items-center justify-center gap-md bg-surface-container-low/50 p-md rounded-[24px] border border-outline-variant/10">
              <div className="relative p-xs bg-white rounded-xl shadow-lg border-2 border-tertiary-container/20">
                <img 
                  alt="QR Code" 
                  className="w-32 h-32 md:w-40 md:h-40" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXmmczNF3wp-cHRKJbof4jxOE8Igh-SIqgXjH91kwtrJ58ODZuwopIPd2z5H0eB4VcP2J2zlYUh6zaLU_wmEW-wOE0McXUFQnE6AjwIBKwz31BV97sUObTZu9vSFGMZKBNj6R_YHHJpXvNkznIhsqD3u-g1LABBQq-DqxIVLqQj2zYfOB2agb9nohSETAOTTy_s7ndFon5org7ZLeOG-TBIF4kKibATnvJDTj70zTf1jmIexDeQvZayBp8kD2nFX6Odgilsq8TaZc"
                />
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Check-in Reference: LB-77821</span>
            </div>
          </div>
          
          {/* Horizontal Divider */}
          <div className="my-lg border-t border-outline-variant/20"></div>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-sm w-full">
            <Magnet padding={50} disabled={false} magnetStrength={8} wrapperClassName="flex-1" innerClassName="w-full" style={{ display: 'flex' }}>
              <button className="w-full bg-primary-container text-on-primary font-semibold py-sm px-lg rounded-full flex items-center justify-center gap-xs hover:shadow-xl transition-all active:scale-95 border border-tertiary-container/20">
                <span className="material-symbols-outlined">event</span>
                Add to Calendar
              </button>
            </Magnet>
            <Link to="/admin/dashboard" className="flex-1 bg-white border border-primary-container text-primary-container font-semibold py-sm px-lg rounded-full flex items-center justify-center gap-xs hover:bg-primary-container/5 transition-all active:scale-95 text-center">
              <span className="material-symbols-outlined">dashboard</span>
              View My Appointments
            </Link>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-lg flex flex-wrap justify-center gap-lg">
          <a className="flex items-center gap-xs font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer group" href="#">
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">download</span>
            <span>Download Receipt</span>
          </a>
          <a className="flex items-center gap-xs font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer group" href="#">
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">support_agent</span>
            <span>Contact Concierge</span>
          </a>
          <a className="flex items-center gap-xs font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer group" href="#">
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">share</span>
            <span>Share Details</span>
          </a>
        </div>

        {/* LuxeBook Logo Footer (Anchor) */}
        <footer className="mt-xl opacity-30 select-none">
          <Link to="/home" className="font-headline-md text-headline-md text-primary tracking-widest uppercase block cursor-pointer">
            LuxeBook
          </Link>
        </footer>
      </main>
    </div>
  );
}
