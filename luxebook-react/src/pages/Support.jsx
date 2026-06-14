import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

export default function Support() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.subject && formData.message) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-lg max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="font-headline-xl text-primary mb-4">Contact Support</h1>
          <p className="text-on-surface-variant">Our dedicated concierge team is here to assist you.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-low border border-outline-variant/20 rounded-[32px] p-10"
        >
          {isSubmitted ? (
             <div className="text-center py-10">
                <span className="material-symbols-outlined text-6xl text-emerald-green mb-4">check_circle</span>
                <h2 className="font-headline-md text-primary mb-2">Message Sent</h2>
                <p className="text-on-surface-variant mb-8">A member of our concierge team will reach out to you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 border border-outline-variant/20 rounded-xl font-label-caps text-xs tracking-widest hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Send Another Message
                </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-xs font-label-caps tracking-widest text-on-surface-variant mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-surface border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-label-caps tracking-widest text-on-surface-variant mb-2">Message</label>
                <textarea 
                  id="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
                  placeholder="Provide details about your inquiry..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-label-caps text-xs tracking-widest hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Submit Request
              </button>
            </form>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
