"use client";
import React, { useState, useEffect } from "react";

interface SlideImagesProps {
  images?: string[];
  isActive: boolean;
  hasBg: boolean;
}

export const SlideImages: React.FC<SlideImagesProps> = ({ images, isActive, hasBg }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = images?.length || 0;

  useEffect(() => {
    if (count <= 1 || !isActive || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % count);
    }, 3600);
    return () => clearInterval(timer);
  }, [count, isActive, isPaused]);

  if (!images || count === 0) return null;

  const activeClass = isActive
    ? "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-6 pointer-events-none";

  // Single photo view with soft float & hover zoom animation
  if (count === 1) {
    const isPng = images[0].endsWith(".png") || images[0].includes("-preview");
    return (
      <div
        className={`group relative w-full md:w-[44vw] max-w-[520px] aspect-[4/3] rounded-2xl border-2 overflow-hidden transition-all duration-700 animate-float ${
          hasBg
            ? "border-pink-400/30 bg-[#be185d]/20"
            : "border-pink-500/20 bg-pink-50"
        } ${activeClass}`}
        style={
          isActive
            ? {
                boxShadow: hasBg
                  ? "0 24px 50px -12px rgba(190, 24, 93, 0.5), 0 0 35px -8px rgba(236, 72, 153, 0.4)"
                  : "0 28px 60px -12px rgba(236, 72, 153, 0.28)",
                transitionDelay: "0.25s",
              }
            : undefined
        }
      >
        <img
          src={images[0]}
          alt="KamiLimu Moment"
          className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
            isPng ? "object-contain p-6" : "object-cover"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  }

  // Multi-photo interactive & auto-advancing Carousel
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + count) % count);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % count);
  };

  return (
    <div
      className={`flex flex-col gap-3.5 w-full md:w-[45vw] max-w-[540px] transition-all duration-700 ${activeClass}`}
      style={isActive ? { transitionDelay: "0.25s" } : undefined}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Stage */}
      <div
        className={`relative w-full aspect-[4/3] rounded-2xl border-2 overflow-hidden animate-float ${
          hasBg ? "border-pink-400/35 bg-[#1f1218]" : "border-pink-500/25 bg-pink-50"
        }`}
        style={{
          boxShadow: hasBg
            ? "0 24px 50px -12px rgba(190, 24, 93, 0.5), 0 0 35px -8px rgba(236, 72, 153, 0.4)"
            : "0 28px 60px -12px rgba(236, 72, 153, 0.3)",
        }}
      >
        {images.map((img, i) => {
          const isCurrent = i === currentIdx;
          return (
            <img
              key={img}
              src={img}
              alt={`Circle & Memories ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                isCurrent ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
              }`}
            />
          );
        })}

        {/* Subtle bottom gradient for controls readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 via-black/20 to-transparent z-20 pointer-events-none" />

        {/* Counter badge */}
        <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-pink-400/40 text-white text-[11px] font-semibold tracking-wider">
          {currentIdx + 1} / {count}
        </div>

        {/* Left / Right Carousel Arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-pink-500 text-pink-600 hover:text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90"
          aria-label="Previous photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90"
          aria-label="Next photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIdx ? "w-6 bg-pink-400 shadow-[0_0_8px_#ec4899]" : "w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Clickable Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-2.5">
        {images.map((img, i) => {
          const isCurrent = i === currentIdx;
          return (
            <button
              key={img}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(i);
              }}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                isCurrent
                  ? "border-pink-500 scale-[1.03] shadow-[0_8px_20px_rgba(236,72,153,0.35)]"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SlideImages;
