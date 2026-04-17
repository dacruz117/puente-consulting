"use client";

import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import CheckIcon from "@/components/CheckIcon";
import { useLanguage } from "@/context/LanguageContext";

const STAGE_COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#6366F1",
  "#D97706",
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-accent text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{s.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{s.heroSubtitle}</p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {s.packagesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            {/* Inform Me */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-1">{s.packages[0].name}</h3>
              <p className="text-3xl font-bold text-accent mb-1">{s.packages[0].price}</p>
              <p className="text-sm text-gray-500 mb-6">{s.packages[0].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[0].features.map((f) => (
                  <li key={f} className="flex gap-2 text-body text-sm">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>

            {/* Walk Me Through It — Most Popular */}
            <div className="bg-accent rounded-xl p-8 shadow-lg flex flex-col relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                {s.mostPopular}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{s.packages[1].name}</h3>
              <p className="text-3xl font-bold text-white mb-1">{s.packages[1].price}</p>
              <p className="text-sm text-white/70 mb-6">{s.packages[1].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[1].features.map((f) => (
                  <li key={f} className="flex gap-2 text-white text-sm">
                    <svg
                      className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-white text-accent font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>

            {/* Done With You */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-1">{s.packages[2].name}</h3>
              <p className="text-3xl font-bold text-accent mb-1">{s.packages[2].price}</p>
              <p className="text-sm text-gray-500 mb-6">{s.packages[2].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[2].features.map((f) => (
                  <li key={f} className="flex gap-2 text-body text-sm">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">{s.foundingNote}</p>
        </div>
      </section>

      {/* À la Carte */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-3">
            {s.alaCarte.title}
          </h2>
          <p className="text-center text-accent font-medium mb-12">{s.alaCarte.bundleNote}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.alaCarte.stages.map((stage, i) => (
              <div
                key={stage.name}
                className="bg-cream rounded-xl overflow-hidden shadow-sm"
                style={{ borderLeft: `4px solid ${STAGE_COLORS[i] ?? "#6B8BAE"}` }}
              >
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Stage {i + 1}
                  </p>
                  <h3 className="text-base font-bold text-primary mb-4">{stage.name}</h3>
                  <ul className="space-y-3">
                    {stage.items.map((item) => (
                      <li key={item.label} className="text-sm text-body">
                        <div className="flex justify-between gap-2">
                          <span className="leading-snug">{item.label}</span>
                          <span className="font-semibold text-accent whitespace-nowrap">{item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm font-bold">
                    <span className="text-primary">{stage.fullLabel}</span>
                    <span className="text-accent">{stage.fullPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {s.howItWorks.title}
          </h2>
          <div className="space-y-8">
            {s.howItWorks.steps.map((step, i) => (
              <div key={step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <p className="text-lg font-semibold text-primary">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={s.ctaHeading} buttonText={s.ctaButton} href="/contact" />
    </>
  );
}
