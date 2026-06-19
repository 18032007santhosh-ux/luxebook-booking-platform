import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { membershipService } from "../services/membershipService";
import toast from "react-hot-toast";

export default function MembershipConfirm() {
  const [tier, setTier] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = membershipService.getPendingMembership();
    if (!pending) {
      toast.error("No membership selected. Redirecting...");
      navigate("/membership");
    } else {
      setTier(pending);
    }
  }, [navigate]);

  if (!tier) return null;

  const handleProceed = () => {
    if (!agreed) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    navigate("/membership/payment");
  };

  const handleCancel = () => {
    membershipService.clearPendingMembership();
    navigate("/membership");
  };

  // Calculate Dates
  const today = new Date();
  const renewal = new Date();
  renewal.setFullYear(renewal.getFullYear() + 1);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-lg flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full bg-surface-container-low border border-outline-variant/20 rounded-[32px] p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h1 className="font-headline-lg text-primary mb-2">Confirm Your Selection</h1>
            <p className="text-on-surface-variant">Review your luxury membership details before proceeding.</p>
          </div>

          <div className="bg-surface rounded-2xl p-8 mb-8 border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-outline-variant/10">
              <div>
                <span className="font-label-caps text-[10px] text-tertiary tracking-widest block mb-1">SELECTED TIER</span>
                <h2 className="font-headline-md text-2xl">{tier.name}</h2>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-[10px] text-tertiary tracking-widest block mb-1">ANNUAL FEE</span>
                <span className="font-display-sm text-primary text-2xl">{tier.price}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-4">Membership Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Activation Date</span>
                    <span className="font-medium">{formatDate(today)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Renewal Date</span>
                    <span className="font-medium text-primary">{formatDate(renewal)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-4">Included Benefits</h3>
                <ul className="space-y-2">
                  {tier.benefits?.slice(0, 4).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check</span>
                      <span className="text-on-surface-variant">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 mb-8 border border-primary/10">
            <label className="flex items-start gap-4 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-on-surface-variant leading-relaxed">
                I agree to the LuxeBook Elite Membership Terms of Service, Privacy Policy, and authorize the annual recurring charge of {tier.price} until cancelled.
              </span>
            </label>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-4 justify-between">
            <button 
              onClick={handleCancel}
              className="px-8 py-4 rounded-xl font-label-caps tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel Selection
            </button>
            <button 
              onClick={handleProceed}
              disabled={!agreed}
              className={`px-8 py-4 rounded-xl font-label-caps tracking-widest transition-all shadow-md
                ${agreed 
                  ? "bg-primary text-on-primary hover:scale-105" 
                  : "bg-surface-variant text-on-surface-variant/50 cursor-not-allowed"}`}
            >
              Proceed to Payment
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
