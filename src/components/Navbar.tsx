"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const serviceLinks = [
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/web-design", label: t.nav.webDesign },
    { href: "/translation-services", label: t.nav.translationServices },
  ];

  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-transparent.png"
            alt="Puente Consulting"
            width={260}
            height={87}
            className="object-contain h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="text-sm hover:text-accent-light transition-colors flex items-center gap-1"
            >
              {t.nav.services}
              <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white text-primary rounded-xl shadow-lg py-2 z-50">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-gray-100" />
                <Link
                  href="/services"
                  className="block px-4 py-2 text-xs text-gray-400 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  {t.nav.viewAllPricing}
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-sm hover:text-accent-light transition-colors"
          >
            {t.nav.about}
          </Link>

          <Link
            href="/contact"
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
          >
            {t.nav.bookSession}
          </Link>

          <button
            onClick={toggle}
            className="bg-white text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            aria-label="Toggle language"
          >
            <span>{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
            <span>{lang === "en" ? t.nav.langButtonToEs : t.nav.langButtonToEn}</span>
          </button>
        </div>

        {/* Mobile: hamburger only */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {/* Services accordion */}
          <div>
            <button
              className="w-full flex items-center justify-between text-sm hover:text-accent-light transition-colors py-1"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              <span>{t.nav.services}</span>
              <svg
                className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="mt-2 ml-3 space-y-2 border-l border-white/20 pl-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-accent-light transition-colors"
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="block text-xs text-white/60 hover:text-accent-light transition-colors"
                  onClick={closeMobile}
                >
                  {t.nav.viewAllPricing}
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="block text-sm hover:text-accent-light transition-colors"
            onClick={closeMobile}
          >
            {t.nav.about}
          </Link>

          <Link
            href="/contact"
            className="block bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-accent-light transition-colors"
            onClick={closeMobile}
          >
            {t.nav.bookSession}
          </Link>

          <button
            onClick={() => { toggle(); closeMobile(); }}
            className="w-full bg-white text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            aria-label="Toggle language"
          >
            <span>{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
            <span>{lang === "en" ? t.nav.langButtonToEs : t.nav.langButtonToEn}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
