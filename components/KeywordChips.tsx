import React from "react";
import { Keyword } from "@/types/slide";

interface KeywordChipsProps {
  keywords: Keyword[];
  isActive: boolean;
}

export const KeywordChips: React.FC<KeywordChipsProps> = ({ keywords, isActive }) => {
  return (
    <div
      className={`relative z-10 flex flex-wrap gap-[12px] mt-[32px] max-w-full ${
        isActive ? "animate-fadeUp" : ""
      }`}
      style={isActive ? { animationDelay: "0.25s" } : undefined}
    >
      {keywords.map((kw, i) => (
        <span
          key={i}
          style={isActive ? { animationDelay: `${0.2 + i * 0.06}s` } : undefined}
          className={`font-body text-[clamp(12px,0.95vw,15px)] px-[18px] py-[10px] rounded-full whitespace-nowrap transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] ${
            kw.strong
              ? "bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white font-semibold shadow-[0_6px_18px_rgba(236,72,153,0.3)]"
              : "bg-pink-500/15 text-[#be185d] border border-pink-400/30 font-medium shadow-[0_4px_12px_rgba(236,72,153,0.1)] backdrop-blur-sm"
          } ${isActive ? "animate-scaleIn" : ""}`}
        >
          {kw.text}
        </span>
      ))}
    </div>
  );
};
export default KeywordChips;
