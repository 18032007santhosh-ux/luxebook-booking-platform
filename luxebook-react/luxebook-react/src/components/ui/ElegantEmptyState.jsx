import React from 'react';

const ElegantEmptyState = ({ title, description, icon, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-outline-variant rounded-3xl bg-surface/50 glass-card">
      {icon && (
        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold shadow-inner border border-gold/20">
          <span className="material-symbols-outlined text-4xl">{icon}</span>
        </div>
      )}
      <h3 className="text-2xl font-display-lg text-on-surface mb-3">{title}</h3>
      <p className="text-body-lg text-on-surface-variant max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default ElegantEmptyState;
