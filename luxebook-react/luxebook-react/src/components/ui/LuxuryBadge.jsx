import React from 'react';

const LuxuryBadge = ({ children, icon, variant = 'gold', className = "" }) => {
  const variants = {
    gold: "bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30",
    emerald: "bg-gradient-to-r from-primary/20 to-primary/10 text-primary dark:text-primary-fixed border border-primary/30",
    platinum: "bg-gradient-to-r from-slate-300/20 to-slate-300/10 text-slate-700 dark:text-slate-300 border border-slate-300/30",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[14px] mr-1.5">{icon}</span>}
      {children}
    </span>
  );
};

export default LuxuryBadge;
