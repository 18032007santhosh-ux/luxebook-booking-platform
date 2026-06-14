import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const handleSave = () => {
    if (updateUser) {
      updateUser(formData);
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-lg max-w-3xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-low border border-outline-variant/20 rounded-[32px] p-10"
        >
          <div className="flex items-center gap-6 mb-10 border-b border-outline-variant/10 pb-10">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-headline-md">
              {user?.name?.charAt(0) || "M"}
            </div>
            <div>
              <h1 className="font-headline-lg text-primary mb-1">{user?.name || "Member Name"}</h1>
              <p className="text-on-surface-variant">{user?.email || "member@example.com"}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline-sm text-on-surface mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-label-caps tracking-widest text-on-surface-variant mb-2">Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface border border-primary/50 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">{user?.name || "Member Name"}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-label-caps tracking-widest text-on-surface-variant mb-2">Email Address</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface border border-primary/50 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">{user?.email || "member@example.com"}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-label-caps tracking-widest text-on-surface-variant mb-2">Phone Number</label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-surface border border-primary/50 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">{user?.phone || "+1 (555) 000-0000"}</div>
                )}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-outline-variant/10 flex gap-4">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-3 bg-primary text-white font-label-caps text-xs tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        phone: user?.phone || ""
                      });
                      setIsEditing(false);
                    }}
                    className="px-6 py-3 border border-outline-variant/20 text-on-surface font-label-caps text-xs tracking-widest rounded-xl hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-primary text-white font-label-caps text-xs tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
