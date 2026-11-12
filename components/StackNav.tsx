import React from "react";
import { SlideData } from "@/types/slide";

interface StackNavProps {
  slides: SlideData[];
  currentIndex: number;
  onSelect: (index: number) => void;
  accent: string;
  hasBg?: boolean;
}

export const StackNav: React.FC<StackNavProps> = ({
  slides,
  currentIndex,
  onSelect,
  accent,
  hasBg = true,
}) => {
  return (
    <div id="stack-nav" className="absolute right-[26px] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 items-end">
      {slides.map((_, index) => {
        const isOn = index === currentIndex;
        return (
          <div
            key={index}
            onClick={(e) => { e.stopPropagation(); onSelect(index); }}
            className={`cursor-pointer transition-all duration-350 ${
              isOn
                ? "w-[44px] h-[9px] rounded-[4px]"
                : `w-[26px] h-[6px] rounded-[4px] ${hasBg ? "bg-[#f4f2ff]/18 hover:bg-[#f4f2ff]/40" : "bg-[#12102a]/15 hover:bg-[#12102a]/35"}`
            }`}
            style={isOn ? { backgroundColor: accent, boxShadow: `0 0 16px ${accent}` } : undefined}
          />
        );
      })}
    </div>
  );
};
export default StackNav;
