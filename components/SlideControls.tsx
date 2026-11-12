import React from "react";

interface SlideControlsProps {
  prevSlide: () => void;
  nextSlide: () => void;
  currentIndex: number;
  totalSlides: number;
  hasBg?: boolean;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  prevSlide,
  nextSlide,
  currentIndex,
  totalSlides,
  hasBg = true,
}) => {
  const arrowSvg = (d: string) => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.6">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
  return (
    <div className="relative z-20 flex items-center gap-[14px] mt-8 pointer-events-auto">
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        disabled={currentIndex === 0}
        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center border border-pink-300/40 bg-white text-[#db2777] hover:bg-pink-50 shadow-[0_8px_25px_rgba(236,72,153,0.2)] transition-all hover:scale-105 active:scale-90 cursor-pointer ${
          currentIndex === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
        aria-label="Previous Slide"
      >
        {arrowSvg("M15 19l-7-7 7-7")}
      </button>
      <div
        className={`font-body text-[13px] tracking-[0.04em] select-none min-w-[54px] text-center ${
          hasBg ? "text-pink-100" : "text-[var(--ink-dim)]"
        }`}
      >
        <b className={hasBg ? "text-white" : "text-[#db2777]"}>{currentIndex + 1}</b> / {totalSlides}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        disabled={currentIndex === totalSlides - 1}
        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center border-none bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white hover:opacity-95 shadow-[0_8px_28px_rgba(236,72,153,0.35)] transition-all hover:scale-105 active:scale-90 cursor-pointer ${
          currentIndex === totalSlides - 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
        aria-label="Next Slide"
      >
        {arrowSvg("M9 5l7 7-7 7")}
      </button>
    </div>
  );
};
export default SlideControls;
