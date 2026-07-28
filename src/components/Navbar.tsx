"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();
  const pathname = usePathname();

  const serviceLinks = [
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/translation-services", label: t.nav.translationServices },
  ];

  const serviceHrefs = serviceLinks.map((l) => l.href).concat("/services");
  const servicesActive = serviceHrefs.some((h) => pathname === h);
  const aboutActive = pathname === "/about";
  const faqActive = pathname === "/faq";

  function navLinkClass(active: boolean) {
    return `text-sm transition-colors ${
      active
        ? "text-accent-light underline underline-offset-4 decoration-accent-light"
        : "hover:text-accent-light"
    }`;
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3">

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

        {/* Desktop nav — three tabs centered */}
        <div className="hidden md:flex items-center justify-center gap-6">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`${navLinkClass(servicesActive)} flex items-center gap-1`}
            >
              {t.nav.services}
              <svg
                className={`w-3 h-3 mt-0.5 transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Always rendered — opacity transition for smooth fade */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50 transition-all duration-150 ${
                servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-white text-primary rounded-xl shadow-lg py-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === link.href
                        ? "bg-gray-50 font-medium text-accent"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-gray-100" />
                <Link
                  href="/services"
                  className={`block px-4 py-2 text-xs transition-colors ${
                    pathname === "/services"
                      ? "text-accent font-medium"
                      : "text-gray-400 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {t.nav.viewAllPricing}
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className={navLinkClass(aboutActive)}>
            {t.nav.about}
          </Link>

          <Link href="/faq" className={navLinkClass(faqActive)}>
            {t.nav.faq}
          </Link>
        </div>

        {/* Desktop buttons — right-aligned */}
        <div className="hidden md:flex items-center justify-end gap-3">
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

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
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
              className={`w-full flex items-center justify-between text-sm py-1 transition-colors ${
                servicesActive ? "text-accent-light" : "hover:text-accent-light"
              }`}
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
                    className={`block text-sm transition-colors ${
                      pathname === link.href ? "text-accent-light font-medium" : "hover:text-accent-light"
                    }`}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className={`block text-xs transition-colors ${
                    pathname === "/services" ? "text-accent-light font-medium" : "text-white/60 hover:text-accent-light"
                  }`}
                  onClick={closeMobile}
                >
                  {t.nav.viewAllPricing}
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`block text-sm transition-colors ${
              aboutActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.about}
          </Link>

          <Link
            href="/faq"
            className={`block text-sm transition-colors ${
              faqActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.faq}
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
