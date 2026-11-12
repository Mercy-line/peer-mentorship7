"use client";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
}

const YOUTUBE_VIDEO_ID = "fxF-DBCF_s4";

export const MusicPlayer: React.FC = () => {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player("yt-soundtrack-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: () => {
            setIsReady(true);
          },
          onStateChange: (event) => {
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2 || event.data === 0) setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    const handleExternalToggle = () => {
      if (!playerRef.current) {
        setShowVideo(true);
        return;
      }
      const state = playerRef.current.getPlayerState?.();
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };

    window.addEventListener("toggle-kamilimu-music", handleExternalToggle);
    return () => {
      window.removeEventListener("toggle-kamilimu-music", handleExternalToggle);
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) {
      setShowVideo((prev) => !prev);
      return;
    }
    const state = playerRef.current.getPlayerState?.();
    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expandable mini YouTube player */}
      <div
        className={`overflow-hidden rounded-xl border border-[#b38284]/50 bg-[#4a2531] shadow-[0_20px_50px_rgba(74,37,49,0.45)] transition-all duration-500 ${
          showVideo
            ? "w-[290px] h-[164px] opacity-100 translate-y-0"
            : "w-[1px] h-[1px] opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div id="yt-soundtrack-player" className="w-full h-full" />
      </div>

      {/* Floating soundtrack pill */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#4a2531]/95 backdrop-blur-md border border-[#b38284]/60 text-white shadow-[0_12px_35px_rgba(74,37,49,0.38)]">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-[#9d5c63] hover:bg-[#b38284] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
          aria-label={isPlaying ? "Pause Where I Found Myself" : "Play Where I Found Myself"}
          title={isPlaying ? "Pause soundtrack" : "Play Where I Found Myself · August Green"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="font-body text-[10.5px] tracking-[0.06em] text-[#f4dde0] font-bold">
              {isPlaying ? "Now playing" : "Theme song"}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-[2px] h-2.5">
                <span className="w-[2px] h-2.5 bg-[#f4dde0] animate-pulse" />
                <span className="w-[2px] h-1.5 bg-[#f4dde0] animate-pulse" />
                <span className="w-[2px] h-2 bg-[#f4dde0] animate-pulse" />
              </span>
            )}
          </div>
          <span className="font-body text-[12px] font-semibold leading-tight text-white">
            Where I Found Myself · <span className="text-[#e8d5d1] font-normal">August Green</span>
          </span>
        </div>

        <button
          onClick={() => setShowVideo((v) => !v)}
          className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[#f4dde0] transition-all cursor-pointer"
          title="Toggle video view"
        >
          {showVideo ? "hide" : "video"}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
