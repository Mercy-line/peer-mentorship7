import { useState, useEffect, useCallback } from "react";
import { slidesData } from "@/data/slides";

export function useSlideDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const target = Math.max(0, Math.min(index, slidesData.length - 1));
    setCurrentIndex(target);
    document.getElementById(`slide-${target}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sections = slidesData.map((_, i) => document.getElementById(`slide-${i}`));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.id.replace("slide-", ""), 10);
          if (!isNaN(idx)) setCurrentIndex(idx);
        }
      });
    }, { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" });
    sections.forEach((sec) => sec && observer.observe(sec));
    return () => sections.forEach((sec) => sec && observer.unobserve(sec));
  }, [mounted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      const step = e.key === "ArrowRight" || e.key === " " ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (step) { e.preventDefault(); scrollToSlide(currentIndex + step); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, scrollToSlide]);

  return { currentIndex, mounted, scrollToSlide };
}
