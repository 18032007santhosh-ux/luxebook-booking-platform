import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { membershipService } from "../services/membershipService";
import { paymentService } from "../services/paymentService";
import { useAuth } from "../contexts/AuthContext";
import LuxuryBadge from "../components/ui/LuxuryBadge";
import GlassInfoCard from "../components/ui/GlassInfoCard";

export default function MembershipDashboard() {
  const { user, logout } = useAuth();
  const [membership, setMembership] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setMembership(membershipService.getActiveMembership());
    setHistory(paymentService.getTransactionHistory());
  }, []);

  const calculateDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0;
    const diff = new Date(expiryDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-lg max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline-xl text-primary mb-2">Member Portal</h1>
            <p className="text-on-surface-variant">Welcome back, {user?.name || "Member"}.</p>
          </div>
          <button 
            onClick={logout}
            className="text-tertiary font-label-caps text-xs tracking-widest hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Membership Widget */}
          <div className="lg:col-span-2">
            {membership ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white rounded-[32px] p-10 relative overflow-hidden shadow-2xl h-full"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <span className="font-label-caps text-gold tracking-widest text-[10px] mb-2 block">ACTIVE MEMBERSHIP</span>
                      <h2 className="font-headline-lg text-3xl">{membership.name}</h2>
                    </div>
                    <span className="px-4 py-1 rounded-full bg-emerald-green/20 text-emerald-green border border-emerald-green/30 font-label-caps text-[10px] tracking-widest">
                      ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-auto">
                    <div>
                      <span className="block text-white/50 text-xs mb-1">Activation Date</span>
                      <span className="font-medium">{formatDate(membership.activatedAt)}</span>
                    </div>
                    <div>
                      <span className="block text-white/50 text-xs mb-1">Renewal Date</span>
                      <span className="font-medium text-gold">{formatDate(membership.expiresAt)}</span>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <span className="block font-display-xl text-5xl mb-1">{calculateDaysRemaining(membership.expiresAt)}</span>
                      <span className="text-white/50 text-sm">Days Remaining</span>
                    </div>
                    <div className="flex gap-4">
                      <Link to="/membership">
                        <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors font-label-caps text-xs tracking-widest">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container-low border border-outline-variant/20 rounded-[32px] p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <span className="material-symbols-outlined text-[48px] text-tertiary mb-4">stars</span>
                <h2 className="font-headline-md text-primary mb-2">No Active Membership</h2>
                <p className="text-on-surface-variant mb-8 max-w-md">You currently do not have an active membership. Explore our exclusive tiers to elevate your wellness journey.</p>
                <Link to="/membership">
                  <button className="bg-primary text-white font-label-caps px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Explore Tiers
                  </button>
                </Link>
              </motion.div>
            )}

            {/* Loyalty Badges & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="glass-card-light p-6 rounded-2xl flex flex-col items-center text-center border border-gold/20">
                <span className="material-symbols-outlined text-4xl text-gold mb-2">diamond</span>
                <p className="font-headline-sm text-primary">Founding Member</p>
                <p className="text-[10px] font-label-caps tracking-widest text-on-surface-variant mt-1">SINCE 2023</p>
              </div>
              <div className="glass-card-light p-6 rounded-2xl flex flex-col items-center text-center border border-emerald-green/20">
                <span className="material-symbols-outlined text-4xl text-emerald-green mb-2">spa</span>
                <p className="font-headline-sm text-primary">Wellness Pioneer</p>
                <p className="text-[10px] font-label-caps tracking-widest text-on-surface-variant mt-1">10+ TREATMENTS</p>
              </div>
              <div className="glass-card-light p-6 rounded-2xl flex flex-col items-center text-center border border-outline-variant/20">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-50 mb-2">lock</span>
                <p className="font-headline-sm text-on-surface-variant">Inner Circle</p>
                <p className="text-[10px] font-label-caps tracking-widest text-on-surface-variant mt-1">UNLOCK AT 25</p>
              </div>
            </div>

            {/* Timeline: Upcoming Appointments */}
            <div className="mt-8">
              <GlassInfoCard 
                title="Your Itinerary" 
                icon="calendar_month"
                content="Upcoming curated experiences tailored to your preferences."
              >
                <div className="mt-6 border-l-2 border-gold/30 pl-4 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-gold"></div>
                    <p className="font-label-caps text-[10px] tracking-widest text-gold mb-1">OCTOBER 24, 2024</p>
                    <p className="font-headline-md text-primary">Deep Tissue Enhancement</p>
                    <p className="text-sm text-on-surface-variant">The Sanctuary Spa • 4:30 PM</p>
                  </div>
                  <div className="relative opacity-60">
                    <div className="absolute -left-[25px] w-3 h-3 rounded-full border-2 border-gold/50 bg-surface"></div>
                    <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant mb-1">NOVEMBER 12, 2024</p>
                    <p className="font-headline-md text-primary">Wellness Consultation</p>
                    <p className="text-sm text-on-surface-variant">Virtual • 10:00 AM</p>
                  </div>
                </div>
              </GlassInfoCard>
            </div>
            
            {/* Curated Recommendations */}
            <div className="mt-8">
              <h3 className="font-headline-md text-primary mb-4">Curated For You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-32 group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Recommendation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-white font-headline-sm">Himalayan Salt Stone</p>
                    <p className="text-gold text-[10px] font-label-caps tracking-widest">PERFECT MATCH</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-32 group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Recommendation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-white font-headline-sm">Private Sound Bath</p>
                    <p className="text-gold text-[10px] font-label-caps tracking-widest">BASED ON HISTORY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & History */}
          <div className="flex flex-col gap-8">
            
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-[24px] p-8">
              <h3 className="font-headline-md text-primary mb-6">Concierge</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/appointments"
                    aria-label="Book a Treatment"
                    className="w-full text-left flex items-center justify-between py-3 border-b border-outline-variant/10 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 -mx-2 transition-all"
                  >
                    <span className="font-medium text-on-surface group-hover:text-primary transition-colors">Book a Treatment</span>
                    <span className="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile"
                    aria-label="Manage Profile"
                    className="w-full text-left flex items-center justify-between py-3 border-b border-outline-variant/10 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 -mx-2 transition-all"
                  >
                    <span className="font-medium text-on-surface group-hover:text-primary transition-colors">Manage Profile</span>
                    <span className="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/support"
                    aria-label="Contact Support"
                    className="w-full text-left flex items-center justify-between py-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 -mx-2 transition-all"
                  >
                    <span className="font-medium text-on-surface group-hover:text-primary transition-colors">Contact Support</span>
                    <span className="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-surface border border-outline-variant/20 rounded-[24px] p-8 flex-1">
              <h3 className="font-headline-sm text-primary mb-6 border-b border-outline-variant/10 pb-4">Transaction History</h3>
              
              {history.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {[...history].reverse().map((txn) => (
                    <div key={txn.id} className="bg-surface-container-low p-4 rounded-xl text-sm">
                      <div className="flex justify-between font-medium text-primary mb-1">
                        <span>{txn.item}</span>
                        <span>${txn.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>{new Date(txn.date).toLocaleDateString()}</span>
                        <span>{txn.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant text-center py-8">No transaction history.</p>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
