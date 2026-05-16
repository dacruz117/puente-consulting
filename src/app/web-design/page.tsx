"use client";

import Image from "next/image";
import Link from "next/link";
import CheckIcon from "@/components/CheckIcon";
import { useLanguage } from "@/context/LanguageContext";

export default function WebDesignPage() {
  const { t, lang } = useLanguage();
  const wd = t.webDesign;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{wd.heroTitle}</h1>
          <p className="text-xl text-gray-300">{wd.heroSubtitle}</p>
        </div>
      </section>

      {/* Differentiator */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">{wd.differentiatorHeading}</h2>
              <p className="text-body mb-4">{wd.differentiatorP1}</p>
              <p className="text-body mb-6">{wd.differentiatorP2}</p>
            </div>
            <ul className="space-y-3">
              {wd.differentiatorBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 items-start text-body">
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {wd.packages.map((pkg, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={pkg.name}
                  className={`rounded-2xl overflow-hidden flex flex-col relative shadow-sm ${
                    isPopular
                      ? "bg-accent text-white ring-2 ring-accent"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {wd.mostPopular}
                    </span>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className={`text-xl font-bold mb-4 ${isPopular ? "text-white" : "text-primary"}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-4xl font-bold mb-1 ${isPopular ? "text-white" : "text-accent"}`}>
                      {pkg.setupPrice}
                    </p>
                    <p className={`text-sm mb-1 ${isPopular ? "text-white/60" : "text-gray-400"}`}>
                      {wd.setupLabel}
                    </p>
                    <p className={`text-lg font-semibold mb-6 ${isPopular ? "text-white/80" : "text-accent"}`}>
                      {pkg.monthlyPrice}{wd.monthlyLabel}
                    </p>
                    <ul className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f.en} className="flex gap-2 items-start">
                          <svg
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm leading-snug ${isPopular ? "text-white" : "text-body"}`}>
                            {lang === "en" ? f.en : f.es}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                        isPopular
                          ? "bg-white text-accent hover:bg-cream"
                          : "bg-accent text-white hover:bg-accent-light"
                      }`}
                    >
                      {wd.packageCta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-500 italic mt-8">{wd.turnaroundNote}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">{wd.howItWorksHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {wd.howItWorksSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">{wd.addOnsTitle}</h2>
          <p className="text-body text-center mb-8">{wd.addOnsSubtitle}</p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {wd.addOns.map((addon) => (
              <div
                key={addon.name.en}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm text-body">
                  {lang === "en" ? addon.name.en : addon.name.es}
                </span>
                {"highlight" in addon && addon.highlight ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {lang === "en" ? addon.price.en : addon.price.es}
                  </span>
                ) : (
                  <span className="font-semibold text-accent text-sm">
                    {lang === "en" ? addon.price.en : addon.price.es}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-3">{wd.ctaHeading}</h2>
          <p className="text-body mb-6">{wd.ctaSub}</p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
          >
            {wd.ctaButton}
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {wd.disclaimer}
        </p>
      </div>
    </>
  );
}
