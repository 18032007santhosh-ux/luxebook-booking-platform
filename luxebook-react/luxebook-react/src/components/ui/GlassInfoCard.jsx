import React from 'react';

const GlassInfoCard = ({ title, content, icon, className = "", children }) => {
  return (
    <div className={`glass-card p-6 rounded-2xl border border-white/10 dark:border-white/5 relative overflow-hidden group ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
        )}
        {title && <h4 className="text-headline-md text-on-surface mb-2 font-display-lg">{title}</h4>}
        {content && <p className="text-body-md text-on-surface-variant leading-relaxed">{content}</p>}
        {children}
      </div>
    </div>
  );
};

export default GlassInfoCard;
