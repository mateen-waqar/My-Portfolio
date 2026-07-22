import * as React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* Left Emerald Green Wing */}
      <path
        d="M 16 14 L 16 71 C 16 80 23 86 32 86 L 32 58 L 47 43 Z"
        fill="url(#logo-emerald-grad)"
      />
      
      {/* Right Crisp White Wing (Foreground aware) */}
      <path
        d="M 84 14 L 84 71 C 84 80 77 86 68 86 L 68 58 L 53 43 Z"
        className="fill-foreground"
      />
    </svg>
  );
}
