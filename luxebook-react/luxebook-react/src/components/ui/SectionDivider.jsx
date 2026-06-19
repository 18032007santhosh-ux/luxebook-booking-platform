import React from 'react';

const SectionDivider = ({ className = "" }) => {
  return (
    <div className={`w-full flex items-center justify-center py-12 opacity-80 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-full max-w-sm"></div>
      <div className="mx-4 text-gold material-symbols-outlined text-sm">diamond</div>
      <div className="h-px bg-gradient-to-r from-gold via-transparent to-transparent w-full max-w-sm"></div>
    </div>
  );
};

export default SectionDivider;
