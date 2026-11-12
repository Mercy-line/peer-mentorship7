import React from "react";
import { TitleSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "@/components/BackgroundMedia";
import SlideControls from "@/components/SlideControls";

export const Home: React.FC<SlideProps<TitleSlideData>> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex = 0,
  totalSlides = 1,
}) => {
  const triggerSoundtrack = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-kamilimu-music"));
    }
  };

  return (
    <section
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-white/5 bg-[#1a0f16] text-ink transition-all duration-700 ${isActive ? "opacity-100" : "opacity-90"}`}
      style={{ "--accent": slide.accent, "--accent2": slide.accent2 } as React.CSSProperties}
    >
      <BackgroundMedia bgImage={slide.bgImage} />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        <div className="flex flex-col items-start w-full md:max-w-[58%] text-left">
          <div
            className={`relative z-10 font-body tracking-[0.18em] uppercase text-[clamp(12px,1.1vw,14px)] text-pink-400 font-bold mb-[20px] ${isActive ? "animate-fadeUp" : ""}`}
            style={isActive ? { animationDelay: "0.05s", textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined}
          >
            {slide.eyebrow}
          </div>
          <h1
            className={`relative z-10 font-display font-extrabold text-[clamp(44px,7.5vw,100px)] leading-[1.02] tracking-[-0.02em] text-left max-w-[18ch] text-white [&_.glow]:glow-text ${isActive ? "animate-fadeUp" : ""}`}
            style={isActive ? { animationDelay: "0.15s", textShadow: "0 2px 10px rgba(0,0,0,0.5)" } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <div
            className={`relative z-10 mt-[22px] font-body text-[clamp(15px,1.15vw,18px)] text-pink-50/90 tracking-[0.01em] text-left max-w-[46ch] leading-relaxed ${isActive ? "animate-fadeUp" : ""}`}
            style={isActive ? { animationDelay: "0.3s", textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined}
          >
            {slide.subtitle}
          </div>

          <button
            onClick={triggerSoundtrack}
            className="relative z-20 mt-6 inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ec4899] to-[#db2777] hover:opacity-95 text-white font-body text-[13px] font-semibold tracking-wide animate-pulse-pink transition-all cursor-pointer hover:scale-[1.03] active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Theme Song: &ldquo;Where I Found Myself&rdquo; — August Green</span>
          </button>

          {prevSlide && nextSlide && (
            <SlideControls
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              currentIndex={currentIndex}
              totalSlides={totalSlides}
              hasBg={true}
            />
          )}
        </div>

        <div className="relative z-10 mt-8 md:mt-0 md:translate-y-[20px] p-7 rounded-2xl bg-gradient-to-br from-[#ec4899]/95 to-[#be185d]/95 backdrop-blur-md border border-pink-200/30 shadow-[0_20px_50px_rgba(236,72,153,0.45)] max-w-[420px] text-left transition-all duration-700 animate-float">
          <div className="font-body text-[11px] uppercase tracking-[0.18em] text-pink-100 font-bold mb-2">
            My KamiLimu Effect
          </div>
          <p className="font-body font-medium text-[clamp(16px,1.25vw,20px)] leading-relaxed text-white">
            &ldquo;KamiLimu is a dream come true for me — my place of discovery, where the girl who doubted if she belonged in tech finally found herself.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-white/25 font-body text-[12px] font-medium text-pink-100">
            — Mercyline Nyaboke · Cohort 10
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
