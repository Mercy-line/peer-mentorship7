"use client";
import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";
import {
  heroSlides,
  highlightBadges,
  categoryCircles,
  innovationSpotlight,
  definingMomentsCards,
  circleCarouselPhotos,
  coreLessonsList,
} from "@/data/slides";

export const SlideDeck: React.FC = () => {
  const [heroIdx, setHeroIdx] = useState(0);
  const [circleIdx, setCircleIdx] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({
    voice: true,
    resilience: true,
    "best-year": true,
    "super-gal": true,
  });
  const [selectedMomentId, setSelectedMomentId] = useState<string | null>(null);

  // Auto-advance the Lessons & Circle carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCircleIdx((prev) => (prev + 1) % circleCarouselPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const triggerMusic = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-kamilimu-music"));
    }
  };

  const scrollToSection = (id: string, navLabel?: string) => {
    if (navLabel) setActiveNav(navLabel);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentHero = heroSlides[heroIdx];
  const selectedMoment = definingMomentsCards.find((c) => c.id === selectedMomentId);

  return (
    <div className="min-h-screen w-full bg-[#fffdfa] text-[#231519] font-body selection:bg-[#9d5c63] selection:text-white">
      <MusicPlayer />

      {/* 1. NAVBAR USING THE EXACT WHITE FROM https://mbiu-music.vercel.app/ (#fffdfa pill on #fcf4e5/85) */}
      <header
        id="section-home"
        className="sticky top-0 z-50 w-full bg-[#fcf4e5]/85 px-3 py-2.5 backdrop-blur-md transition-colors sm:px-6 sm:py-3"
      >
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-[#d5c5b2] bg-[#fffdfa] px-4 py-2 shadow-[0_16px_40px_-16px_rgba(22,26,38,0.22),0_3px_10px_-2px_rgba(22,26,38,0.08)] backdrop-blur-xl sm:px-6 sm:py-2.5"
        >
          {/* Official KamiLimu Logo + "the effect · mercyline" below */}
          <button
            onClick={() => scrollToSection("section-home", "home")}
            className="flex flex-col items-start pl-1 transition hover:opacity-90 cursor-pointer"
          >
            <img
              src="/photos/kamilimu-logo.png"
              alt="KamiLimu Logo"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <span className="text-[10.5px] font-medium tracking-[0.08em] text-[#9d5c63] mt-0.5 pl-0.5">
              the effect · mercyline
            </span>
          </button>

          {/* Center Navigation Links (lowercase / normal case) */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-[13.5px] font-semibold tracking-[0.02em] text-[#231519]">
            {[
              { label: "home", target: "section-home" },
              { label: "pillars", target: "section-pillars" },
              { label: "innovation", target: "section-innovation" },
              { label: "defining moments", target: "section-moments" },
              { label: "lessons & circle", target: "section-circle" },
              { label: "super gal", target: "section-footer" },
            ].map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.target, item.label)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive ? "text-[#9d5c63]" : "hover:text-[#9d5c63]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9d5c63] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Header Actions */}
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              onClick={triggerMusic}
              title="Play theme song: Where I Found Myself"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#d5c5b2] bg-white text-[#9d5c63] shadow-xs transition hover:bg-[#faf7f2] cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.9">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("section-moments", "defining moments")}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#9d5c63] hover:bg-[#874c53] px-4 sm:px-5 text-[12.5px] font-semibold tracking-wide text-white shadow-[0_8px_20px_rgba(157,92,99,0.32)] transition cursor-pointer"
            >
              <span>110% effect</span>
            </button>
          </div>
        </nav>
      </header>

      {/* 2. HERO BANNER (#e8d5d1 Warm Dusty Blush-Taupe) */}
      <section className="relative w-full bg-[#e8d5d1] pt-10 pb-24 sm:pt-14 sm:pb-28 px-6 sm:px-14">
        {/* Left Hero Carousel Arrow */}
        <button
          onClick={() => setHeroIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#fffdfa] hover:bg-white text-[#231519] flex items-center justify-center shadow-[0_8px_24px_rgba(157,92,99,0.25)] transition-all cursor-pointer active:scale-90"
          aria-label="Previous Hero Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Hero Carousel Arrow */}
        <button
          onClick={() => setHeroIdx((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#fffdfa] hover:bg-white text-[#231519] flex items-center justify-center shadow-[0_8px_24px_rgba(157,92,99,0.25)] transition-all cursor-pointer active:scale-90"
          aria-label="Next Hero Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative z-10 max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Column */}
          <div key={heroIdx} className="lg:col-span-6 text-left animate-fadeUp">
            <div className="text-[13px] sm:text-[14px] font-semibold tracking-[0.06em] text-[#9d5c63] mb-2.5">
              {currentHero.eyebrow}
            </div>
            <h1 className="text-[38px] sm:text-[54px] font-bold text-[#1f1216] leading-[1.08] tracking-[-0.02em] whitespace-pre-line">
              {currentHero.title}
            </h1>
            <p className="mt-5 text-[15px] sm:text-[16px] text-[#3a262c] leading-relaxed max-w-[52ch]">
              {currentHero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={triggerMusic}
                className="px-7 py-3.5 rounded-md bg-[#9d5c63] hover:bg-[#874c53] text-white text-[13px] font-semibold tracking-[0.04em] shadow-[0_12px_28px_rgba(157,92,99,0.38)] transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                {currentHero.cta}
              </button>
              <button
                onClick={() => scrollToSection("section-moments", "defining moments")}
                className="px-6 py-3.5 rounded-md bg-[#fffdfa] hover:bg-white text-[#4a2531] text-[13px] font-semibold tracking-[0.04em] border border-[#9d5c63]/30 shadow-[0_8px_20px_rgba(157,92,99,0.16)] transition-all cursor-pointer"
              >
                Read my journey
              </button>
            </div>
          </div>

          {/* Right Multi-Photo Pedestal Composition with Rich Colored Drop Shadows */}
          <div className="lg:col-span-6 flex items-end justify-center gap-3 sm:gap-5 relative">
            {/* Secondary Left Card */}
            <div className="w-[30%] aspect-[3/4.2] rounded-2xl overflow-hidden border-2 border-[#fffdfa] shadow-[0_18px_40px_rgba(157,92,99,0.28)] bg-[#fffdfa]">
              <img
                src={currentHero.secondaryImage}
                alt="KamiLimu Journey"
                className="w-full h-full object-cover"
                style={{ objectPosition: currentHero.secondaryPos }}
              />
            </div>

            {/* Center Tall Pedestal Card */}
            <div className="w-[40%] flex flex-col rounded-2xl overflow-hidden border-2 border-[#fffdfa] shadow-[0_24px_52px_rgba(157,92,99,0.35)] bg-[#fffdfa] -translate-y-2">
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={currentHero.image}
                  alt="Where I Found Myself"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: currentHero.imagePos }}
                />
              </div>
              <div className="bg-[#fffdfa] py-2.5 px-2 text-center border-t border-[#eee2e0]">
                <div className="text-[11px] font-bold tracking-[0.04em] text-[#9d5c63]">
                  {currentHero.badgeTitle}
                </div>
                <div className="text-[11px] text-[#4a2531] font-medium mt-0.5">
                  {currentHero.badgeSub}
                </div>
              </div>
            </div>

            {/* Third Right Card */}
            <div className="w-[29%] aspect-[3/4.1] rounded-2xl overflow-hidden border-2 border-[#fffdfa] shadow-[0_18px_40px_rgba(157,92,99,0.28)] bg-[#fffdfa]">
              <img
                src={currentHero.thirdImage}
                alt="KamiLimu Growth"
                className="w-full h-full object-cover"
                style={{ objectPosition: currentHero.thirdPos }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLOATING WHITE 4-BADGE STRIP OVERLAPPING HERO WITH COLORFUL DROP SHADOW */}
      <div className="relative z-20 max-w-[1180px] mx-auto px-4 sm:px-8 -mt-12">
        <div className="bg-[#fffdfa] rounded-xl shadow-[0_18px_45px_rgba(157,92,99,0.22),0_4px_14px_rgba(74,37,49,0.08)] border border-[#e6cfd2] py-6 px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightBadges.map((b, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#f7ebec] text-[#9d5c63] shadow-[0_6px_16px_rgba(157,92,99,0.2)] flex items-center justify-center shrink-0">
                {b.icon === "sparkle" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z"
                    />
                  </svg>
                )}
                {b.icon === "bolt" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {b.icon === "book" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.182.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.182.477-4 1.253"
                    />
                  </svg>
                )}
                {b.icon === "heart" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-[13.5px] font-bold text-[#231519]">{b.title}</div>
                <div className="text-[12px] text-[#6e555c] leading-snug mt-0.5">{b.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 6 CIRCULAR PILLARS · Rings Removed, Full Edge-to-Edge Circles with Colored Drop Shadows */}
      <section id="section-pillars" className="max-w-[1220px] mx-auto px-4 sm:px-8 pt-14 pb-12 text-center">
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[0.02em] text-[#231519]">
          My KamiLimu growth pillars
        </h2>
        <div className="w-10 h-[2px] bg-[#9d5c63] mx-auto mt-2.5 mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {categoryCircles.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(cat.targetId)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-[#9d5c63]/20 shadow-[0_14px_32px_rgba(157,92,99,0.24)] group-hover:shadow-[0_20px_42px_rgba(157,92,99,0.36)] transition-all duration-300 group-hover:-translate-y-1.5">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover rounded-full"
                  style={{ objectPosition: cat.objectPosition }}
                />
              </div>
              <span className="mt-4 text-[13.5px] font-bold tracking-[0.01em] text-[#231519] group-hover:text-[#9d5c63] transition-colors">
                {cat.label}
              </span>
              <span className="text-[11.5px] text-[#6e555c] mt-0.5">{cat.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. SPLIT FEATURE BANNER FOR INNOVATION WITH COLORED DROP SHADOWS */}
      <section id="section-innovation" className="max-w-[1220px] mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Dusty Mauve Card (#b38284) */}
          <div className="lg:col-span-5 rounded-xl bg-[#b38284] text-white p-8 sm:p-11 flex flex-col justify-center text-left shadow-[0_18px_45px_rgba(157,92,99,0.3)]">
            <div className="text-[12px] font-semibold tracking-[0.06em] text-[#fceef0] mb-2.5">
              {innovationSpotlight.eyebrow}
            </div>
            <h3 className="text-[26px] sm:text-[32px] font-bold leading-[1.15]">
              {innovationSpotlight.title}
            </h3>
            <p className="mt-4 text-[14px] sm:text-[15px] text-white leading-relaxed">
              {innovationSpotlight.description}
            </p>
            <div className="mt-5 pt-4 border-t border-white/25 text-[13px] italic text-[#fceef0]">
              &ldquo;What I feared at the start became the best part of it all.&rdquo;
            </div>
            <div className="mt-6">
              <button
                onClick={() => scrollToSection("section-circle", "lessons & circle")}
                className="px-6 py-3 rounded-md bg-[#fffdfa] hover:bg-[#f7ebec] text-[#9d5c63] text-[12.5px] font-bold tracking-[0.04em] transition-all cursor-pointer shadow-md"
              >
                {innovationSpotlight.buttonText}
              </button>
            </div>
          </div>

          {/* Right Wide Innovation Photo Card */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden aspect-[4/3] border border-[#e6cfd2] shadow-[0_18px_45px_rgba(157,92,99,0.24)] bg-[#fffdfa]">
            <img
              src={innovationSpotlight.image}
              alt="The Innovation Pillar"
              className="w-full h-full object-cover"
              style={{ objectPosition: innovationSpotlight.objectPosition }}
            />
          </div>
        </div>
      </section>

      {/* 6. 4-CARD DEFINING MOMENTS & SKILLS GRID WITH RICH COLORED DROP SHADOWS */}
      <section id="section-moments" className="max-w-[1220px] mx-auto px-4 sm:px-8 pt-12 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16 hidden sm:block" />
          <div className="text-center">
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[0.02em] text-[#231519]">
              Defining moments & skills
            </h2>
            <div className="w-10 h-[2px] bg-[#9d5c63] mx-auto mt-2" />
          </div>
          <button
            onClick={() => scrollToSection("section-circle", "lessons & circle")}
            className="text-[12.5px] font-bold tracking-[0.03em] text-[#9d5c63] hover:underline cursor-pointer"
          >
            view all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {definingMomentsCards.map((card) => {
            const isLiked = !!likedCards[card.id];
            return (
              <div
                key={card.id}
                className="group bg-[#fffdfa] rounded-xl border border-[#ead5d7] p-4 flex flex-col justify-between text-center shadow-[0_14px_36px_rgba(157,92,99,0.2),0_4px_12px_rgba(74,37,49,0.06)] hover:shadow-[0_22px_50px_rgba(157,92,99,0.32)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Card Top Bar */}
                  <div className="flex items-center justify-between mb-2.5 px-0.5">
                    <span className="text-[11px] font-semibold tracking-[0.03em] text-[#9d5c63]">
                      {card.tag}
                    </span>
                    <button
                      onClick={() => setLikedCards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))}
                      className="text-[#9d5c63] hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Appreciate moment"
                    >
                      <svg
                        className="w-4 h-4"
                        fill={isLiked ? "#9d5c63" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Crystal Clear Unobstructed Image */}
                  <div className="w-full aspect-[4/4.6] rounded-lg overflow-hidden bg-[#f7ebec] mb-4 border border-[#eee2e0]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: card.objectPosition }}
                    />
                  </div>

                  <h3 className="text-[15.5px] font-bold text-[#231519] leading-snug px-1">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-[#574046] leading-relaxed px-1">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f7ebec]">
                  <div className="text-[12px] font-bold text-[#9d5c63]">{card.metric}</div>
                  <div className="flex items-center justify-center gap-1 mt-1 text-[12px] text-[#f59e0b]">
                    <span>★★★★★</span>
                    <span className="text-[11px] text-[#6e555c]">({card.ratingCount})</span>
                  </div>

                  <button
                    onClick={() => setSelectedMomentId(card.id === selectedMomentId ? null : card.id)}
                    className="mt-3.5 w-full py-2.5 rounded-md bg-[#9d5c63] hover:bg-[#874c53] text-white text-[12px] font-semibold tracking-[0.04em] shadow-[0_6px_16px_rgba(157,92,99,0.28)] transition-colors cursor-pointer"
                  >
                    {card.buttonLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner when a card button is clicked */}
        {selectedMoment && (
          <div className="mt-6 p-6 rounded-xl bg-[#f7ebec] border border-[#b38284]/40 shadow-[0_12px_30px_rgba(157,92,99,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeUp">
            <div className="text-left">
              <div className="text-[11.5px] font-bold tracking-[0.04em] text-[#9d5c63]">
                {selectedMoment.tag} · deep reflection
              </div>
              <div className="text-[16px] font-bold text-[#231519] mt-1">{selectedMoment.title}</div>
              <p className="text-[13.5px] text-[#4a2531] mt-1 max-w-3xl leading-relaxed">
                {selectedMoment.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedMomentId(null)}
              className="px-4 py-2 rounded-md bg-[#9d5c63] text-white text-[12px] font-semibold tracking-wide shrink-0 cursor-pointer"
            >
              close
            </button>
          </div>
        )}
      </section>

      {/* 7. LESSONS & CLOSE CIRCLE CAROUSEL SECTION */}
      <section id="section-circle" className="w-full bg-[#fcf6f6] border-y border-[#eee2e0] py-14 px-4 sm:px-8">
        <div className="max-w-[1220px] mx-auto">
          <div className="text-center mb-10">
            <div className="text-[12px] font-bold tracking-[0.06em] text-[#9d5c63]">
              Relationships & life lessons
            </div>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#231519] mt-1">
              Lessons & close circle: people happy to see you grow
            </h2>
            <div className="w-12 h-[2px] bg-[#9d5c63] mx-auto mt-2.5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: 4-Photo Interactive & Auto-Advancing Carousel */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden border border-[#e6cfd2] shadow-[0_18px_45px_rgba(157,92,99,0.24)] bg-[#231519]">
                <div className="relative w-full aspect-[4/3.8] bg-[#1c1215]">
                  {circleCarouselPhotos.map((photo, i) => {
                    const isCurrent = i === circleIdx;
                    return (
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.caption}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                          photo.isPortrait ? "object-contain" : "object-cover"
                        } ${isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                        style={!photo.isPortrait ? { objectPosition: photo.objectPosition } : undefined}
                      />
                    );
                  })}

                  {/* Prev/Next Carousel Buttons */}
                  <button
                    onClick={() =>
                      setCircleIdx((prev) => (prev - 1 + circleCarouselPhotos.length) % circleCarouselPhotos.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#fffdfa] hover:bg-white text-[#4a2531] flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Previous circle photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCircleIdx((prev) => (prev + 1) % circleCarouselPhotos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#9d5c63] hover:bg-[#874c53] text-white flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Next circle photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Solid Caption Bar Below Photo */}
                <div className="bg-[#fffdfa] p-4 border-t border-[#eee2e0] text-left">
                  <div className="text-[11px] font-bold tracking-[0.04em] text-[#9d5c63]">
                    Photo {circleIdx + 1} of {circleCarouselPhotos.length} · Cohort 10 memories
                  </div>
                  <div className="text-[13.5px] font-semibold text-[#231519] mt-0.5">
                    {circleCarouselPhotos[circleIdx].caption}
                  </div>
                </div>
              </div>

              {/* 4 Thumbnail Selectors */}
              <div className="grid grid-cols-4 gap-3">
                {circleCarouselPhotos.map((photo, i) => (
                  <button
                    key={photo.src}
                    onClick={() => setCircleIdx(i)}
                    className={`aspect-[4/3.2] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-[#fffdfa] ${
                      i === circleIdx
                        ? "border-[#9d5c63] ring-2 ring-[#9d5c63]/30 shadow-[0_8px_20px_rgba(157,92,99,0.28)]"
                        : "border-[#d5c5b2] hover:border-[#9d5c63] shadow-[0_4px_12px_rgba(157,92,99,0.12)]"
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition: photo.objectPosition }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Lessons & Relationships Cards with Colored Drop Shadows */}
            <div className="lg:col-span-6 flex flex-col gap-4 text-left">
              {coreLessonsList.map((lesson, idx) => (
                <div
                  key={idx}
                  className="bg-[#fffdfa] rounded-xl p-5 border border-[#ead5d7] shadow-[0_12px_30px_rgba(157,92,99,0.18),0_3px_10px_rgba(74,37,49,0.05)] hover:shadow-[0_18px_40px_rgba(157,92,99,0.28)] hover:border-[#b38284] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#f7ebec] text-[#9d5c63] text-[11.5px] font-bold flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(157,92,99,0.2)]">
                      0{idx + 1}
                    </span>
                    <h4 className="text-[15px] font-bold text-[#231519]">{lesson.title}</h4>
                  </div>
                  <p className="text-[13px] text-[#574046] mt-1.5 pl-10 leading-relaxed">{lesson.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOFT BLUSH 4-COLUMN STRIP ABOVE FOOTER (#f7ebec) */}
      <div className="w-full bg-[#f7ebec] py-7 px-4 sm:px-10 border-t border-[#eee2e0]">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Master's & PhD bound", sub: "Future researcher & academic" },
            { title: "Future mentor", sub: "Giving back to the community" },
            { title: "Unapologetically me", sub: "More than one thing at once" },
            { title: "Super gal mindset", sub: "Cannot be blocked from her dreams" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#fffdfa] text-[#9d5c63] flex items-center justify-center shadow-[0_6px_16px_rgba(157,92,99,0.2)] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[13px] font-bold tracking-[0.02em] text-[#231519]">{item.title}</div>
                <div className="text-[11.5px] text-[#6e555c]">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. DEEP PLUM-BURGUNDY FOOTER (#4a2531) */}
      <footer id="section-footer" className="w-full bg-[#4a2531] text-white pt-14 pb-12 px-6 sm:px-12">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          {/* Col 1: Brand with KamiLimu Logo + the effect · mercyline */}
          <div className="md:col-span-4 text-left">
            <div className="inline-flex flex-col items-start bg-[#fffdfa] rounded-lg px-3.5 py-2 mb-3 shadow-md">
              <img
                src="/photos/kamilimu-logo.png"
                alt="KamiLimu Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] font-medium tracking-[0.08em] text-[#9d5c63] mt-0.5">
                the effect · mercyline
              </span>
            </div>
            <div className="text-[11.5px] tracking-[0.06em] text-[#f4dde0] mt-1">
              Mercyline Nyaboke · Cohort 10
            </div>
            <p className="mt-3 text-[13px] text-[#e8d5d1] leading-relaxed max-w-xs">
              &ldquo;KamiLimu is a dream come true for me. It is my place of discovery, where the girl who doubted whether she belonged in tech finally found herself.&rdquo;
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-2 text-left">
            <div className="text-[13px] font-bold tracking-[0.04em] text-[#f4dde0] mb-3">
              Sections
            </div>
            <ul className="space-y-2 text-[12.5px] text-[#e8d5d1]">
              <li>
                <button onClick={() => scrollToSection("section-home", "home")} className="hover:text-white cursor-pointer">
                  Where I found myself
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("section-pillars", "pillars")} className="hover:text-white cursor-pointer">
                  Growth pillars
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("section-innovation", "innovation")} className="hover:text-white cursor-pointer">
                  Innovation pillar
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("section-moments", "defining moments")} className="hover:text-white cursor-pointer">
                  Defining moments
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("section-circle", "lessons & circle")} className="hover:text-white cursor-pointer">
                  Lessons & close circle
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gratitude Circle */}
          <div className="md:col-span-3 text-left">
            <div className="text-[13px] font-bold tracking-[0.04em] text-[#f4dde0] mb-3">
              Gratitude & close circle
            </div>
            <ul className="space-y-2 text-[12.5px] text-[#e8d5d1]">
              <li>Dr. Chao Mbogho (Dr. C)</li>
              <li>All KamiLimu mentors & speakers</li>
              <li>Close circle & friendships built</li>
              <li>Fellow Cohort 10 mentees</li>
              <li>Future Master&apos;s & PhD researcher</li>
            </ul>
          </div>

          {/* Col 4: Theme Song Player Box */}
          <div className="md:col-span-3 text-left">
            <div className="text-[13px] font-bold tracking-[0.04em] text-[#f4dde0] mb-3">
              Soundtrack of my journey
            </div>
            <p className="text-[12.5px] text-[#e8d5d1] leading-relaxed mb-4">
              The song that describes my KamiLimu Effect the most: <b>&ldquo;Where I Found Myself&rdquo;</b> by August Green.
            </p>
            <div className="flex items-stretch rounded-md overflow-hidden border border-white/20 shadow-md">
              <div className="bg-[#fffdfa] text-[#231519] px-3 py-2.5 text-[12px] flex-1 flex items-center truncate">
                August Green · Where I Found Myself
              </div>
              <button
                onClick={triggerMusic}
                className="bg-[#9d5c63] hover:bg-[#b38284] text-white px-4 py-2.5 text-[12px] font-bold tracking-[0.04em] transition-colors cursor-pointer shrink-0"
              >
                play song
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1220px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11.5px] text-[#e8d5d1]/80 gap-4">
          <div>© 2026 Mercyline Nyaboke · Cohort 10 Peer Mentorship Task 7 · The KamiLimu Effect</div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-sm bg-white/10 text-white font-semibold">110% always</span>
            <span className="px-2.5 py-1 rounded-sm bg-white/10 text-white font-semibold">resilient</span>
            <span className="px-2.5 py-1 rounded-sm bg-white/10 text-white font-semibold">super gal</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SlideDeck;
