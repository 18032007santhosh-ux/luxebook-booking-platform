import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { membershipService } from "../services/membershipService";
import { paymentService } from "../services/paymentService";
import toast from "react-hot-toast";

export default function MembershipPayment() {
  const [tier, setTier] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: ""
  });

  useEffect(() => {
    const pending = membershipService.getPendingMembership();
    if (!pending) {
      toast.error("No active session found.");
      navigate("/membership");
    } else {
      setTier(pending);
    }
  }, [navigate]);

  if (!tier) return null;

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === "cardNumber") formattedValue = formatCardNumber(value);
    if (name === "expiry") formattedValue = formatExpiry(value);
    if (name === "cvv") formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isProcessing) return;

    if (formData.cardNumber.length < 19 || formData.expiry.length < 5 || formData.cvv.length < 3) {
      toast.error("Please fill in all card details correctly.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Processing secure transaction...");

    try {
      // Process mock payment
      await paymentService.processPayment(formData, {
        name: tier.name,
        price: parseInt(tier.price.replace(/[^0-9]/g, "")) // e.g. "$5,000" -> 5000
      });

      // Activate membership locally
      membershipService.activateMembership(tier);
      
      toast.success("Payment successful!", { id: toastId });
      navigate("/membership/success");

    } catch (err) {
      toast.error(err.message || "Transaction failed. Please try again.", { id: toastId });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface relative overflow-hidden">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-lg flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-surface-container-low border border-outline-variant/20 rounded-[32px] shadow-2xl overflow-hidden"
        >
          {/* Order Summary Side */}
          <div className="bg-black text-white p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <span className="font-label-caps text-gold tracking-widest text-xs mb-2 block">SECURE CHECKOUT</span>
              <h2 className="font-headline-lg mb-8">Order Summary</h2>
              
              <div className="mb-8">
                <h3 className="font-headline-md text-gold mb-1">{tier.name}</h3>
                <p className="text-white/60 text-sm">Annual Membership</p>
              </div>

              <div className="space-y-4 text-sm border-t border-white/20 pt-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span>{tier.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Taxes</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-white/20">
                  <span>Total Due</span>
                  <span className="text-gold">{tier.price}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 flex items-center gap-3 opacity-60">
              <span className="material-symbols-outlined text-lg">lock</span>
              <span className="text-xs">256-bit SSL Encryption</span>
            </div>
          </div>

          {/* Payment Form Side */}
          <div className="p-10 relative">
            {isProcessing && (
              <div className="absolute inset-0 z-20 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-r-[32px]">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="font-label-caps tracking-widest text-primary animate-pulse">Processing...</p>
              </div>
            )}

            <h2 className="font-headline-md text-primary mb-6">Payment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-2">CARDHOLDER NAME</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-2">CARD NUMBER</label>
                <div className="relative">
                  <input 
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength="19"
                    className="w-full bg-surface border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
                    placeholder="0000 0000 0000 0000"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">credit_card</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-2">EXPIRY (MM/YY)</label>
                  <input 
                    type="text"
                    name="expiry"
                    required
                    value={formData.expiry}
                    onChange={handleChange}
                    maxLength="5"
                    className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-2">CVV</label>
                  <input 
                    type="password"
                    name="cvv"
                    required
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="4"
                    className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-mono tracking-widest"
                    placeholder="•••"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-2">BILLING ADDRESS</label>
                <input 
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="123 Luxury Lane, NY 10001"
                />
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white font-label-caps tracking-widest py-4 rounded-xl mt-4 hover:bg-primary/90 transition-colors shadow-lg active:scale-95"
              >
                Complete Payment
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
