import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { paymentService } from "../services/paymentService";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

export default function MembershipSuccess() {
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const latestTxn = paymentService.getLatestTransaction();
    if (!latestTxn) {
      navigate("/membership");
    } else {
      setTransaction(latestTxn);
      // Optional: Add a subtle confetti or sound effect here
    }
  }, [navigate]);

  if (!transaction) return null;

  const handleDownloadReceipt = () => {
    try {
      const doc = new jsPDF();
      
      // Branding
      doc.setFontSize(24);
      doc.setTextColor(15, 94, 77); // Emerald Green
      doc.text("LuxeBook", 20, 30);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Official Transaction Receipt", 20, 40);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 45, 190, 45);

      // Details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Transaction ID: ${transaction.id}`, 20, 60);
      doc.text(`Date: ${new Date(transaction.date).toLocaleString()}`, 20, 70);
      doc.text(`Payment Method: **** **** **** ${transaction.last4}`, 20, 80);
      doc.text(`Status: ${transaction.status}`, 20, 90);

      // Membership Item
      doc.setFontSize(14);
      doc.setTextColor(15, 94, 77);
      doc.text("Item Summary", 20, 110);
      doc.line(20, 115, 190, 115);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Membership Tier: ${transaction.item}`, 20, 130);
      
      // Amount
      doc.setFontSize(16);
      doc.text(`Amount Paid: $${transaction.amount.toLocaleString()}.00`, 20, 150);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Thank you for your business. Welcome to the Inner Circle.", 20, 280);

      doc.save(`LuxeBook_Receipt_${transaction.id}.pdf`);
      toast.success("Receipt downloaded successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate receipt.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface relative overflow-hidden">
      <Navbar />
      
      {/* Background celebration glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="flex-1 pt-32 pb-24 px-lg flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full bg-white border border-outline-variant/10 rounded-[32px] shadow-2xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-gold to-primary"></div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary"
          >
            <span className="material-symbols-outlined text-[48px]">verified</span>
          </motion.div>

          <h1 className="font-headline-lg text-primary mb-2">Membership Activated</h1>
          <p className="text-on-surface-variant mb-10">Welcome to LuxeBook. Your premium access is now live.</p>

          <div className="bg-surface-container-low rounded-2xl p-6 text-left mb-10 border border-outline-variant/20">
            <h2 className="font-label-caps text-[10px] text-tertiary tracking-widest mb-4 border-b border-outline-variant/10 pb-2">TRANSACTION DETAILS</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">Transaction ID</span>
                <span className="font-mono">{transaction.id}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">Tier</span>
                <span className="font-medium text-primary">{transaction.item}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">Amount Paid</span>
                <span className="font-medium">${transaction.amount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Purchase Date</span>
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownloadReceipt}
              className="px-8 py-4 rounded-xl border-2 border-primary/20 text-primary font-label-caps tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Receipt
            </button>
            <Link to="/membership/dashboard">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-label-caps tracking-widest shadow-lg hover:scale-105 transition-all">
                Enter Dashboard
              </button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
