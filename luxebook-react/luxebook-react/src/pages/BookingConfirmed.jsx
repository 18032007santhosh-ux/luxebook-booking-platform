import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Magnet from "../components/ui/Magnet";
import toast from "react-hot-toast";
import { generateReceiptPDF } from "../utils/receiptGenerator";
import { authService } from "../services/authService";
import { bookingService } from "../services/bookingService";

export default function BookingConfirmed() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Fetch latest booking from Supabase
    async function loadLatestBooking() {
      try {
        const user = authService.getCurrentUser();
        const dataBookings = await bookingService.getBookings(user?.id || null, false);
        if (dataBookings.length > 0) {
          setBooking(dataBookings[0]);
        }
      } catch (e) {
        console.error("Failed to load latest booking:", e);
      }
    }
    loadLatestBooking();

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

  const handleDownloadReceipt = async () => {
    try {
      toast("Generating receipt...");
      await generateReceiptPDF(booking);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate receipt. Please try again.");
    }
  };

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
          <h1 className="font-headline-xl text-headline-xl text-primary mb-xs">Booking Confirmed</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            {booking ? `Your reservation for the ${booking.serviceName} has been secured.` : "Your reservation has been confirmed. We are preparing for your arrival."}
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
                <h2 className="font-headline-md text-headline-md text-on-surface">{booking?.serviceName || "Royal Thai Massage"}</h2>
              </div>
              <div className="space-y-sm">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-body-md text-body-md">{booking?.date || "Friday, October 24, 2024"}</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span className="font-body-md text-body-md">{booking?.time || "4:30 PM"} ({booking?.duration || "90 Minutes"})</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span className="font-body-md text-body-md">${booking?.price || 350}.00 (Base Rate)</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <span className="font-body-md text-body-md">Guest: <span className="font-semibold text-primary">{booking?.customerName || "Elena S. Volkov"}</span></span>
                </div>
              </div>
            </div>
            
            {/* QR Code & Digital Pass */}
            <div className="flex flex-col items-center justify-center gap-md bg-surface-container-low/50 p-md rounded-[24px] border border-outline-variant/10">
              <div className="relative p-xs bg-white rounded-xl shadow-lg border-2 border-tertiary-container/20">
                <img 
                  alt="QR Code" 
                  className="w-32 h-32 md:w-40 md:h-40" 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking?.bookingId || "LB-77821"}&color=0F5E4D`}
                />
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Booking Ref: {booking?.bookingId || "LB-77821"}</span>
            </div>
          </div>
          
          {/* Horizontal Divider */}
          <div className="my-lg border-t border-outline-variant/20"></div>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-sm w-full">
            <Link to="/home" className="flex-1 w-full bg-primary-container text-on-primary font-semibold py-sm px-lg rounded-full flex items-center justify-center gap-xs hover:shadow-xl transition-all active:scale-95 border border-tertiary-container/20">
              <span className="material-symbols-outlined">home</span>
              Return Home
            </Link>
            <Link to="/explore" className="flex-1 bg-white border border-primary-container text-primary-container font-semibold py-sm px-lg rounded-full flex items-center justify-center gap-xs hover:bg-primary-container/5 transition-all active:scale-95 text-center">
              <span className="material-symbols-outlined">explore</span>
              Book Another
            </Link>
            <button 
              onClick={handleDownloadReceipt}
              className="flex-1 bg-transparent border border-outline-variant/30 text-on-surface font-semibold py-sm px-lg rounded-full flex items-center justify-center gap-xs hover:bg-surface-variant/50 transition-all active:scale-95 text-center"
              aria-label="Download Receipt"
            >
              <span className="material-symbols-outlined text-primary">download</span>
              Download Receipt
            </button>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="w-full max-w-2xl mt-8">
          <h3 className="font-headline-md text-primary text-xl mb-4">Curated For You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card-light p-4 rounded-xl border border-outline-variant/10 flex items-center gap-4 hover:border-gold/30 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-lg bg-surface overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Massage" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-headline-sm text-sm text-primary mb-1">Deep Tissue Enhancement</p>
                <p className="font-label-caps text-[10px] text-gold tracking-widest">+ $45.00</p>
              </div>
            </div>
            <div className="glass-card-light p-4 rounded-xl border border-outline-variant/10 flex items-center gap-4 hover:border-gold/30 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-lg bg-surface overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Aromatherapy" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-headline-sm text-sm text-primary mb-1">Bespoke Aromatherapy</p>
                <p className="font-label-caps text-[10px] text-gold tracking-widest">COMPLIMENTARY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-lg flex flex-wrap justify-center gap-lg">
          <Link to="/admin/dashboard" className="flex items-center gap-xs font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">dashboard</span>
            <span>View Admin Dashboard</span>
          </Link>
          <a className="flex items-center gap-xs font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer group" onClick={(e) => { e.preventDefault(); toast("Concierge chat coming soon."); }}>
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">support_agent</span>
            <span>Contact Concierge</span>
          </a>
        </div>
      </main>
    </div>
  );
}
