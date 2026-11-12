import React from "react";
import { navItems } from "./navData";

interface NavBarProps {
  currentIndex: number;
  scrollToSlide: (index: number) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentIndex, scrollToSlide }) => {
  return (
    <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[500px] md:bottom-auto md:top-[20px] md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-[1040px] pointer-events-auto">
      <div className="flex items-center justify-around md:justify-between gap-[4px] md:gap-[8px] px-[12px] md:px-[16px] py-[10px] md:py-[8px] rounded-full border border-pink-500/15 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(236,72,153,0.18)] md:shadow-[0_8px_30px_rgba(236,72,153,0.12)] transition-all duration-500 overflow-x-auto scrollbar-none pb-[8px] md:pb-[8px]">
        {navItems.map((item) => {
          const isCurrent = item.index === currentIndex;
          return (
            <button
              key={item.index}
              onClick={() => scrollToSlide(item.index)}
              className={`font-body text-[12px] font-semibold tracking-[0.02em] px-[10px] md:px-[14px] py-[10px] md:py-[7px] rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center ${
                isCurrent
                  ? "bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white shadow-[0_4px_16px_rgba(236,72,153,0.4)] scale-[1.03]"
                  : "text-[#6b4c5b] hover:text-[#db2777] hover:bg-pink-500/10"
              }`}
              aria-label={item.label}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden flex items-center justify-center w-[20px] h-[20px]">{item.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default NavBar;
