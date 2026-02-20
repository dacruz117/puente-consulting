"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PUENTE
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-accent-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
          >
            {t.nav.bookSession}
          </Link>
          <button
            onClick={toggle}
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggle}
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            className="text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm hover:text-accent-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-accent-light transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.bookSession}
          </Link>
        </div>
      )}
    </nav>
  );
}
