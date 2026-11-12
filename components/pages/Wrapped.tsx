import React from "react";
import { ClosingSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "@/components/BackgroundMedia";
import SlideControls from "@/components/SlideControls";
import KeywordChips from "@/components/KeywordChips";
import SlideImages from "@/components/SlideImages";

export const Wrapped: React.FC<SlideProps<ClosingSlideData>> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex = 0,
  totalSlides = 1,
}) => {
  const hasBg = !!slide.bgImage;
  const hasImages = !!slide.contentImages && slide.contentImages.length > 0;
  const fadeUp = isActive ? "animate-fadeUp" : "";
  const shadow = isActive && hasBg ? { textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined;

  return (
    <section
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-pink-500/10 transition-all duration-700 ${
        hasBg ? "bg-[#1a0f16] text-white" : "bg-[#fffbfd] text-[var(--ink)]"
      } ${isActive ? "opacity-100" : "opacity-95"}`}
      style={{ "--accent": slide.accent, "--accent2": slide.accent2 } as React.CSSProperties}
    >
      <BackgroundMedia bgImage={slide.bgImage} />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        <div className={`flex flex-col items-start w-full ${hasImages ? "md:max-w-[55%]" : "md:max-w-[75%]"} text-left`}>
          <div
            className={`relative z-10 font-body tracking-[0.18em] uppercase text-[clamp(11px,1vw,14px)] text-pink-400 font-bold mb-[18px] ${fadeUp}`}
            style={isActive ? { animationDelay: "0.05s", ...shadow } : undefined}
          >
            {slide.eyebrow}
          </div>
          <h1
            className={`relative z-10 font-display font-extrabold text-[clamp(36px,5.8vw,76px)] leading-[1.04] tracking-[-0.02em] ${
              hasBg ? "text-white" : "text-[var(--ink)]"
            } ${fadeUp}`}
            style={isActive ? { animationDelay: "0.15s", textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          <KeywordChips keywords={slide.keywords} isActive={isActive} />

          <div
            className={`relative z-10 mt-[28px] font-body text-[16px] leading-relaxed max-w-[50ch] ${
              hasBg ? "text-pink-100" : "text-[var(--ink-dim)]"
            } ${fadeUp}`}
            style={isActive ? { animationDelay: "0.35s", ...shadow } : undefined}
          >
            {slide.thanks}
          </div>
          {prevSlide && nextSlide && (
            <SlideControls
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              currentIndex={currentIndex}
              totalSlides={totalSlides}
              hasBg={hasBg}
            />
          )}
        </div>
        <SlideImages images={slide.contentImages} isActive={isActive} hasBg={hasBg} />
      </div>
    </section>
  );
};

export default Wrapped;
