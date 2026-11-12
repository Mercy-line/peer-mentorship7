import React from "react";
import { ContentSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "@/components/BackgroundMedia";
import SlideControls from "@/components/SlideControls";
import KeywordChips from "@/components/KeywordChips";
import SlideImages from "@/components/SlideImages";

export const Research: React.FC<SlideProps<ContentSlideData>> = ({
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
        <div className={`flex flex-col items-start w-full ${hasImages ? "md:max-w-[52%]" : "md:max-w-[75%]"} text-left`}>
          <div
            className={`relative z-10 font-body tracking-[0.18em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold mb-[18px] ${fadeUp}`}
            style={isActive ? { animationDelay: "0.08s", ...shadow } : undefined}
          >
            {slide.eyebrow}
          </div>
          <h1
            className={`relative z-10 font-display font-extrabold text-[clamp(36px,5.6vw,74px)] leading-[1.04] tracking-[-0.02em] max-w-[18ch] ${
              hasBg ? "text-white" : "text-[var(--ink)]"
            } ${fadeUp}`}
            style={isActive ? { animationDelay: "0.16s", textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <div
            className={`relative z-10 font-body text-[clamp(14px,1.15vw,18px)] mt-[16px] leading-relaxed ${
              hasBg ? "text-pink-100 [&_b]:text-white" : "text-[var(--ink-dim)] [&_b]:text-[#db2777]"
            } ${fadeUp}`}
            style={isActive ? { animationDelay: "0.24s", ...shadow } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.who }}
          />

          <KeywordChips keywords={slide.keywords} isActive={isActive} />

          <div
            className={`relative z-10 mt-[40px] font-display font-semibold text-[clamp(18px,1.6vw,25px)] max-w-[38ch] border-l-4 border-[var(--accent)] pl-[18px] ${
              hasBg ? "text-white" : "text-[var(--ink)]"
            } [&_span]:text-[var(--accent)] ${fadeUp}`}
            style={isActive ? { animationDelay: "0.4s", textShadow: hasBg ? "0 2px 8px rgba(0,0,0,0.5)" : undefined } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.tagline }}
          />

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

export default Research;
