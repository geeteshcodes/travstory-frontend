"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Stories", href: "/stories", active: true },
  { label: "Foodie", href: "#foodie" },
  { label: "Packages", href: "/packages" },
  { label: "Chat", href: "/chat" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
        <div className="flex justify-between items-center px-6 lg:px-12 py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-headline font-black text-on-surface hover:opacity-80 transition-opacity"
            id="site-logo"
          >
            Travstory 
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`pb-1 transition-all duration-300 ${
                  link.active
                    ? "text-brand border-b-2 border-brand"
                    : "text-on-surface opacity-80 hover:opacity-100 hover:text-brand"
                }`}
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-6">
            <button className="text-brand hover:opacity-80 transition-opacity" aria-label="Search" id="search-btn">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="text-on-surface hover:text-brand transition-colors hidden md:block" aria-label="Account" id="account-btn">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-on-surface"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              id="mobile-menu-toggle"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-surface pt-20 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        id="mobile-menu"
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between py-5 border-b border-on-surface/10 text-lg font-headline font-bold text-on-surface hover:text-brand transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              <span className="material-symbols-outlined text-brand">arrow_forward</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
