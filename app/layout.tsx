import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FeedbackButton from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: " TRAVSTORY",
  description:
    "The Journal of Modern Exploration. Discover the world's most inspiring destinations, curated stories, and travel experiences for 2026.",
  keywords: "travel, destinations, 2026, editorial, voyager, exploration, adventure",
  openGraph: {
    title: " TRAVSTORY",
    description:
      "The Journal of Modern Exploration. Cinematic travel stories and destinations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <FeedbackButton />
      </body>
    </html>
  );
}
