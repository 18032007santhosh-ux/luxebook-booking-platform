import React from 'react';

const SkeletonLoader = ({ className = "", type = "text" }) => {
  const types = {
    text: "h-4 w-full rounded",
    title: "h-8 w-3/4 rounded-lg",
    circle: "h-12 w-12 rounded-full",
    card: "h-64 w-full rounded-2xl",
    image: "h-full w-full rounded-xl"
  };

  return (
    <div 
      className={`bg-surface-variant/50 dark:bg-surface-container-high relative overflow-hidden ${types[type] || types.text} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default SkeletonLoader;
