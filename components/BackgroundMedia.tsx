import React from "react";

interface BackgroundMediaProps {
  bgImage?: string;
}

export const BackgroundMedia: React.FC<BackgroundMediaProps> = ({ bgImage }) => {
  if (!bgImage) return null;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img src={bgImage} alt="" className="w-full h-full object-cover opacity-80" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 75%, transparent 100%)",
        }}
      />
    </div>
  );
};
export default BackgroundMedia;
