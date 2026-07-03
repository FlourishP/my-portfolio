"use client";

import { useState } from "react";

interface DialOption {
  label: string;
  value: string;
}

interface DialControlProps {
  options: DialOption[];
  onChange: (value: string) => void;
}

export function DialControl({ options, onChange }: DialControlProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rotation = (activeIndex / (options.length - 1)) * 270 - 135;

  function handleClick(index: number) {
    setActiveIndex(index);
    onChange(options[index].value);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 rounded-full border-2 border-border bg-panel flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full border border-border/50" />
        <div
          className="absolute w-0.5 h-10 bg-coral rounded-full origin-bottom transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className="w-3 h-3 rounded-full bg-coral z-10" />
      </div>
      <div className="flex gap-3">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => handleClick(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              i === activeIndex
                ? "bg-coral/20 text-coral border border-coral/30"
                : "bg-[#FFFFFF08] text-silver-dim border border-border hover:text-silver"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
