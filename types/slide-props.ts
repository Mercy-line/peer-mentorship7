import { SlideData } from "./slide";

export interface SlideProps<T = SlideData> {
  slide: T;
  isActive: boolean;
  prevSlide?: () => void;
  nextSlide?: () => void;
  currentIndex?: number;
  totalSlides?: number;
}
