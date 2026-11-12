import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The KamiLimu Effect · Where I Found Myself · Mercyline",
  description:
    "Cohort 10 Peer Mentorship Task 7: What KamiLimu Means to Me. A Place of Discovery, Resilience, and Growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffdfa] text-[#231519]">{children}</body>
    </html>
  );
}
