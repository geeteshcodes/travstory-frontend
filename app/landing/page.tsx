"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const features = [
  { img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80", title: "Smart Flight Booking", desc: "Find the cheapest flights across all airlines with real-time price tracking." },
  { img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700&q=80", title: "Hotel Selection", desc: "Compare stays from luxury resorts to cozy boutique hotels worldwide." },
  { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80", title: "Local Dining", desc: "Discover authentic restaurants and hidden culinary gems like a local." },
  { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80", title: "Activities & Tours", desc: "Book unique experiences and guided tours at the very best prices." },
  { img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80", title: "Itinerary Planner", desc: "Build optimized day-by-day plans with zero scheduling conflicts." },
  { img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=700&q=80", title: "Budget Optimizer", desc: "Real-time savings suggestions and smart price alerts for every booking." },
];

const steps = [
  { number: "01", title: "Tell us your dream", desc: "Share your destination, dates, budget, and travel style. Our AI listens and understands." },
  { number: "02", title: "Get your plan", desc: "Receive a complete, optimized itinerary with real prices in seconds no guesswork." },
  { number: "03", title: "Book & explore", desc: "Confirm everything in one place. Your adventure is ready to go." },
];

const BLUE_GRAD = "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)";
const SECTION_BG = "linear-gradient(135deg, #f1f5f9 0%, #eff6ff 100%)";
const CTA_BG = "linear-gradient(120deg, #1e40af 0%, #2563eb 55%, #0891b2 100%)";

// Array of background images for the hero slideshow
const heroImages = [
  "/lady dancing in desert.avif",
  "/dubai-tower.jpg",
  "/japan-travel.jpg",
  "/snowy-mountain-trek.jpg",
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111827] pt-[76px]">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[92vh] min-h-[680px] flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === currentSlide ? 1 : 0 }}
          >
            <img alt="Travel destination" className="w-full h-full object-cover" src={img} />
          </div>
        ))}

        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.76) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(0,0,0,0.40) 0%, transparent 100%)" }} />

        <div className="absolute bottom-6 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl w-full animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.07] text-white mb-6" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.45)" }}>
            Your Perfect Trip,<br />
            <span style={{ color: "#67e8f9" }}>Perfectly Priced.</span>
          </h1>

          <p
            className="whitespace-nowrap text-lg md:text-xl font-medium w-full mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            AI builds your complete itinerary — flights, hotels, dining, and activities — all optimized for your budget and style.
          </p>

          {/* --- VIBRANT BUTTON (ORANGE-RED GRADIENT) --- */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Link
    href="/preferences"
    prefetch={true}
    aria-label="Start planning — it's free"
    className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
    style={{
      background: "linear-gradient(135deg, #ff6b35 0%, #f43f5e 100%)", // Vibrant orange to rose
    }}
  >
    <span>Start planning</span>
    <span className="text-white/80 font-normal">—</span>
    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
      it&apos;s free
    </span>
    {/* Arrow icon */}
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </Link>

  {/* Secondary CTA */}
  <a
    href="#howitworks"
    className="text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20"
    style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
  >
    Learn how it works
  </a>
</div>

          <p className="mt-9 text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
            Trusted by 10,000+ travelers worldwide
          </p>
        </div>
      </section>

      {/* The rest of your page remains identical */}
      <div className="h-20"></div>

      {/* Features */}
      <section id="features" className="py-28 px-6 md:px-10 bg-white flex justify-center mb-20">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#3b82f6" }}>Everything You Need</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">All the tools to plan and book your dream trip, in one place</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full place-items-stretch">
            {features.map((f, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 flex flex-col w-full" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}>
                <div className="h-48 w-full overflow-hidden">
                  <img src={f.img} alt={f.title} className="block w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-base font-bold mb-2 transition-colors group-hover:text-blue-600">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20"></div>

      {/* How It Works */}
      <section id="howitworks" className="py-28 px-6 md:px-10 flex justify-center mb-20" style={{ background: SECTION_BG }}>
        <div className="w-full max-w-5xl">
          <div className="mb-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "#3b82f6" }}>Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">How It Works</h2>
            <p className="text-lg text-gray-500 max-w-xl ml-94 text-right">Three simple steps to your perfect vacation</p>
          </div>
          <div className="h-3"></div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 z-0" style={{ left: "62%", width: "76%", height: "1px", background: "linear-gradient(to right, rgba(59,130,246,0.45), transparent)" }} />
                )}
                <div className="relative z-30">
                  <div className="w-16 h-16 mb-7 rounded-full flex items-center justify-center text-white font-bold text-xl leading-none relative left-[100px]" style={{ background: BLUE_GRAD, boxShadow: "0 8px 24px rgba(59,130,246,0.38)" }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm max-w-[240px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20"></div>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 flex justify-center mb-12" style={{ background: CTA_BG }}>
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Ready to Explore?</h2>
          <div className="h-3"></div>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed whitespace-nowrap" style={{ color: "rgba(219,234,254,0.9)" }}>
            Join thousands of travelers who&apos;ve discovered their perfect journey with TravStory.
          </p>
          <div className="h-3"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/preferences" className="inline-block px-10 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105" style={{ background: "#ffffff", color: "#1d4ed8", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              Start Planning Now
            </Link>
            <div className="h-3"></div>
            <a href="#features" className="inline-block px-10 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:bg-white/10" style={{ border: "2px solid rgba(255,255,255,0.5)" }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#030712" }} className="text-white pt-16 pb-10 px-6 md:px-10">
        <div className="h-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-14">
            <div style={{ maxWidth: "360px" }}>
              <p className="text-2xl font-extrabold mb-3 tracking-tight">TravStory</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#9ca3af" }}>Your perfect trip, optimized for price and experience.</p>
              <div className="flex items-center gap-4">
                {[
                  { label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { label: "YouTube", d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                  { label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.669-.072-4.949-.2-4.358-2.621-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                ].map(({ label, d }) => (
                  <a key={label} href="#" aria-label={label} className="hover:text-white transition-colors" style={{ color: "#6b7280" }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-12 lg:gap-16">
              {[
                { heading: "Product", links: ["Features", "Pricing", "Security", "Mobile App"] },
                { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                { heading: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy"] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <p className="text-white font-semibold text-sm mb-5">{heading}</p>
                  <ul className="space-y-3">
                    {links.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: "#9ca3af" }}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-sm" style={{ borderTop: "1px solid #1f2937", color: "#6b7280" }}>
            <p> 2026 TravStory. All rights reserved.</p>
            <p>Made with for travelers</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out both; }

        /* CTA button — subtle text breathe + glow on hover */
        .cta-link .cta-word {
          transition: letter-spacing 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cta-link:hover .cta-word {
          letter-spacing: 0.035em;
        }
        @keyframes cta-glow {
          0%, 100% { box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 1px 2px rgba(15,23,42,0.06),
            0 12px 30px -10px rgba(2,8,23,0.35),
            0 0 0 0 rgba(0,87,217,0); }
          50% { box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 1px 2px rgba(15,23,42,0.06),
            0 14px 34px -10px rgba(2,8,23,0.40),
            0 0 0 5px rgba(0,87,217,0.10); }
        }
        .cta-link { animation: cta-glow 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cta-link { animation: none; }
          .cta-link .cta-word { transition: none; }
        }
      `}</style>
    </div>
  );
}