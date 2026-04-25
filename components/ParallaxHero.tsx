"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";



export default function ParallaxHero() {
  const { scrollY } = useScroll();

  // Text moves up slightly as we scroll
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  const HIDE_START = 1400; // Start fading out 100px before image ends
  const HIDE_END = 1500;   // Completely hidden by this point

  // Opacity: 1 until 700px, then fade to 0 by 800px
  const textOpacity = useTransform(scrollY, [HIDE_START, HIDE_END], [1, 0]);
  
  // Visibility: hidden after 800px (prevents interaction/rendering)
  const textVisibility = useTransform(scrollY, (value) =>
    value > HIDE_END ? "hidden" : "visible"
  );

  return (
    <>
      {/* Fixed text layer */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
          visibility: textVisibility,
        }}
        className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
      >
        <div className="text-center max-w-7xl px-6">
          <div className="text-sm lg:text-base tracking-[0.3em] text-white uppercase mb-4 lg:mb-6">
            TravStory&apos;s
          </div>

          <div className="relative bg-[#0041a7] px-6 py-3 lg:px-16 lg:py-6 inline-block">
            <div className="text-white font-headline font-black text-5xl sm:text-7xl lg:text-[14rem] leading-none tracking-[-0.03em] whitespace-nowrap">
              TRAVSTORY
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <span className="bg-yellow-400 text-black px-6 py-2 text-xl lg:text-2xl font-headline font-black tracking-wider">
              2026
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/70 font-mono text-sm lg:text-base">
            
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            
          </div>

          <div className="mt-6 text-white/50 text-xs lg:text-sm uppercase tracking-[0.2em]">
             <span className="text-white font-bold ml-1"></span>
          </div>
        </div>
      </motion.div>

      {/* Scrollable content */}
      <div>
        {/* Spacer */}
        <div className="h-screen" />

        {/* Placard images */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-12 -translate-y-60 translate-x-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="max-w-[420px] lg:max-w-[460px]">
              <Image
                src="/dubai_tourism.jpg"
                alt="Scenic travel placard"
                width={900}
                height={1200}
                className="w-full h-auto object-cover shadow-2xl rotate-[-2deg]"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-[420px] lg:max-w-[460px]">
              <Image
                src="/disney_cruise.jpg"
                alt="Travel placard"
                width={900}
                height={1200}
                className="w-full h-auto object-cover shadow-2xl rotate-[2deg]"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Main deep-sea image — covers text */}
        <div className="relative w-full h-[120vh] overflow-hidden">
          <Image
            src="/india-monument.png"
            alt="Tropical cliff bay"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ zIndex: 40 }}
            priority
            quality={75}
          />
        </div>
      </div>
    </>
  );
}