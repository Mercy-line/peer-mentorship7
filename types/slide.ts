export interface Keyword {
  text: string;
  strong?: boolean;
}

export interface BaseSlide {
  id: number;
  accent: string;
  accent2: string;
  eyebrow: string;
  title: string; // supports HTML or formatted strings
  bgImage?: string; // optional background image path
  contentImages?: string[]; // optional list of inline/floating emphasis images
}

export interface TitleSlideData extends BaseSlide {
  type: "title";
  subtitle: string;
  stackColors: string[];
}

export interface ContentSlideData extends BaseSlide {
  type: "content";
  bignum: string;
  who: string;
  keywords: Keyword[];
  tagline: string; // supports <span> for highlights
}

export interface ClosingSlideData extends BaseSlide {
  type: "closing";
  keywords: Keyword[];
  thanks: string;
}

export type SlideData = TitleSlideData | ContentSlideData | ClosingSlideData;
