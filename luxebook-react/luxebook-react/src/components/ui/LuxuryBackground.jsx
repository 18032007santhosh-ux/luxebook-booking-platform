import React from "react";

export default function LuxuryBackground({
  className = "",
  intensity = "normal",
}) {
  const blurSize =
    intensity === "strong"
      ? "blur-[180px]"
      : "blur-[140px]";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Emerald Glow */}
      <div
        className={`absolute top-[-10%] left-[10%]
        h-[500px] w-[500px]
        rounded-full
        bg-[#0B3B36]/10
        ${blurSize}`}
      />

      {/* Gold Glow */}
      <div
        className={`absolute bottom-[-10%] right-[10%]
        h-[500px] w-[500px]
        rounded-full
        bg-[#C6A87D]/12
        ${blurSize}`}
      />

      {/* Center Highlight */}
      <div
        className={`absolute left-1/2 top-1/3
        h-[350px] w-[350px]
        -translate-x-1/2
        rounded-full
        bg-white/30
        blur-[120px]`}
      />
    </div>
  );
}
