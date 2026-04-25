"use client";

import React, { useState, useEffect } from "react";

export default function PackagesPage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
 const heroImages = [
  "/pexels-koithyr-1360254.jpg",
  "/pexels-ding-lei-2386439-4028665.jpg",
  "/pexels-tonywuphotography-16761607.jpg",
];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter state
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Luxury Escape"]);

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="bg-[#f7f9fc] text-[#191c1e] antialiased min-h-screen pt-[72px] font-sans">
      {/* Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0,1"
        rel="stylesheet"
      />
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>

      {/* Hero Carousel Section */}
      <header className="relative w-full h-[70vh] min-h-[550px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 transition-all duration-700 ease-in-out">
          <img
            src={heroImages[currentSlide]}
            alt="Hero travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#f7f9fc]"></div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 z-20 bg-white/30 backdrop-blur-md hover:bg-white/50 rounded-full p-2 transition-all duration-300"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined text-white text-3xl">chevron_left</span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 z-20 bg-white/30 backdrop-blur-md hover:bg-white/50 rounded-full p-2 transition-all duration-300"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined text-white text-3xl">chevron_right</span>
        </button>

        {/* Dots Indicator */}
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

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 -mt-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Curated Package Deals
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium drop-shadow-md">
            Discover extraordinary journeys crafted for the discerning traveler.
          </p>
        </div>

        {/* Floating Search Bar - Modern & Visible */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-30">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center border border-white/30">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50/80 rounded-xl focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-gray-500">location_on</span>
              <input
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="Where to? (City, country)"
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50/80 rounded-xl focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-gray-500">calendar_month</span>
              <input
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="Check-in → Check-out"
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50/80 rounded-xl focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-gray-500">group</span>
              <input
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="2 adults, 1 child"
                type="text"
              />
            </div>
            <button className="bg-[#0058bc] hover:bg-[#003f8a] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">search</span>
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Modern & Animated */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg sticky top-28 border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#002155] to-[#0058bc] bg-clip-text text-transparent">
                  Refine Search
                </h2>
                <button className="text-sm text-[#0058bc] hover:text-[#003f8a] font-medium transition-all hover:scale-105">
                  Reset all
                </button>
              </div>

              {/* Budget Range */}
              <div className="mb-8 group">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">attach_money</span>
                  Budget Range
                </h3>
                <div className="px-1">
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0058bc] transition-all duration-200"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-3 font-medium">
                    <span>$1k</span>
                    <span className="text-[#0058bc] font-bold animate-pulse">
                      ${priceRange / 1000}k
                    </span>
                    <span>$10k+</span>
                  </div>
                </div>
              </div>

              {/* Experience Style */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">style</span>
                  Experience Style
                </h3>
                <div className="space-y-2.5">
                  {["Luxury Escape", "Cultural Immersion", "Adventure & Nature", "Wellness Retreat"].map(
                    (style) => (
                      <label
                        key={style}
                        className="flex items-center gap-3 cursor-pointer group transition-all duration-200 hover:translate-x-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(style)}
                          onChange={() => toggleStyle(style)}
                          className="w-4 h-4 text-[#0058bc] rounded border-gray-300 focus:ring-[#0058bc]/50 transition-all"
                        />
                        <span className="text-gray-700 group-hover:text-[#0058bc] transition text-sm">
                          {style}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">checklist</span>
                  Inclusions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Flights", "Hotels", "Transfers", "Tours", "Meals"].map((item) => (
                    <button
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-medium hover:border-[#0058bc] hover:text-[#0058bc] hover:bg-[#0058bc]/5 transition-all duration-200 hover:scale-105"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Deals Grid */}
          <div className="flex-1">
            {/* Sort & Count */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
              <p className="text-gray-600">
                Showing <span className="font-bold text-gray-900">3</span> exclusive deals
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0058bc]/50 transition-all">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration</option>
                </select>
              </div>
            </div>

            {/* Cards Grid - Using your original images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Card 1 - Balinese Sanctuary (your original image) */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-gray-100 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPBwAn88Ft28dbOo5tCOluDliWy_m6D0-CFydIgO96w-gaub7rqgAUjKdO_VR7UOcWAlPyT3_R6D6V6zeFfEtGk6YfX0doLEO7PhH8e2nFJwxxAi8OH6IQcMoxmexAjlVYICVOYQtg1_BP5CStPZWGxOlhErp-ysX7zHNpDGJgzF2rIehwJl_ZWQqvq3iRUYITlbw7PXGs65BFfR0-_puoQdicGWov7gJrnuz_lLdZsC1mLzRCcpkQybc-aNvQdqbGZongcRsrVOXV"
                    alt="Bali villa pool"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#002155] shadow-sm">
                    Save 15%
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2 gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>10 Days / 9 Nights</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">The Balinese Sanctuary</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    Experience ultimate serenity with private villa stays, guided temple tours, and wellness retreats.
                  </p>
                  <div className="flex items-center gap-3 mb-5 text-gray-500">
                    <span className="material-symbols-outlined text-base" title="Flights">flight</span>
                    <span className="material-symbols-outlined text-base" title="Hotel">hotel</span>
                    <span className="material-symbols-outlined text-base" title="Transfers">directions_car</span>
                    <span className="material-symbols-outlined text-base" title="Tours">explore</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">From</p>
                      <p className="text-2xl font-bold text-[#0058bc]">$3,250<span className="text-sm text-gray-400 font-normal">/pp</span></p>
                    </div>
                    <button className="bg-gray-100 hover:bg-[#0058bc] text-gray-800 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 2 - Parisian Elegance (your original image) */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-gray-100 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYSYt58-B7WcnKPbopPG4OT_WHOXiqQplBMqoepyvYSDWyrIM4Ob8KbGvbMrVWEJlZzXe_4DjYDHOvBagbTJpOEzAoIr6t7Kz5wdT5V_c4YDas47Ls2gCSwa5gUpQTdh1kVpjmRe0tKNwAf33n8lRDhPCjTBg3cH_IRBV0652JlvBaoKnrTRe8CzxaFXguPZFkzw8kptdfVNDNT-MG_pagDRfCCtgc6GNIMOqeNuUA-0XMRN_SC2BFaauN7ZPurcmZbP9cXWL0-shY"
                    alt="Paris streets"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2 gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>7 Days / 6 Nights</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">Parisian Elegance</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    A curated journey through the city of light, featuring boutique stays and exclusive culinary experiences.
                  </p>
                  <div className="flex items-center gap-3 mb-5 text-gray-500">
                    <span className="material-symbols-outlined text-base" title="Flights">flight</span>
                    <span className="material-symbols-outlined text-base" title="Hotel">hotel</span>
                    <span className="material-symbols-outlined text-base" title="Dining">restaurant</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">From</p>
                      <p className="text-2xl font-bold text-[#0058bc]">$4,100<span className="text-sm text-gray-400 font-normal">/pp</span></p>
                    </div>
                    <button className="bg-gray-100 hover:bg-[#0058bc] text-gray-800 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 3 - Aegean Odyssey (your original image) */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-gray-100 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCffxT3H3na2qru0gcOH0druT7PEfWJ5P2PhlYpx7nBOok1f4ENhwqU6FmiEl87segqktzbZt4FOHF45gNzIcqPBpzGKoHM528SXUaWmQPBTkVUTp3BtzLlcjJYxAgS9TinLYlNHq4UHgShQEMrmwpIEBXejMg0yX6XlfofpKnBRPvgUpleSCwdCXeWeTJSkbexwn5WOo4MSo97YlNwrYb4pdZ5RRO08emxnUQiB80smh5jCyqyDPcJN7RDtY4EYVm61bjfhHtG_9Vl"
                    alt="Santorini coast"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#002155] shadow-sm">
                    Popular
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2 gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>12 Days / 11 Nights</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">Aegean Odyssey</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    Island hop through Greece in style with private catamaran charters and cliffside luxury suites.
                  </p>
                  <div className="flex items-center gap-3 mb-5 text-gray-500">
                    <span className="material-symbols-outlined text-base" title="Flights">flight</span>
                    <span className="material-symbols-outlined text-base" title="Hotel">hotel</span>
                    <span className="material-symbols-outlined text-base" title="Boat">sailing</span>
                    <span className="material-symbols-outlined text-base" title="Transfers">directions_car</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">From</p>
                      <p className="text-2xl font-bold text-[#0058bc]">$5,800<span className="text-sm text-gray-400 font-normal">/pp</span></p>
                    </div>
                    <button className="bg-gray-100 hover:bg-[#0058bc] text-gray-800 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-[#0058bc] hover:text-[#0058bc] transition-all hover:scale-105">
                Load More Experiences
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="font-bold text-white text-lg">Elevated Voyager</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Travel Insurance</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
          </div>
          <div className="text-gray-400">© 2026 TravStory. Curated Travel Experiences.</div>
        </div>
      </footer>
    </div>
  );
}