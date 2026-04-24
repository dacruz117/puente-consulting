"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import CheckIcon from "@/components/CheckIcon";
import { useLanguage } from "@/context/LanguageContext";

const STAGE_COLORS = [
  "#3B82F6", "#10B981", "#8B5CF6", "#06B6D4",
  "#F59E0B", "#EF4444", "#6366F1",
];

const BIZ_STAGE_COLORS = [
  "#3B82F6", "#10B981", "#8B5CF6", "#06B6D4",
  "#F59E0B", "#EF4444", "#6366F1", "#D97706",
];

type Tab = "general" | "academic" | "business";

export default function ServicesPage() {
  const { t, lang } = useLanguage();
  const s = t.services;
  const [activeTab, setActiveTab] = useState<Tab>("academic");
  const [alaCarteOpen, setAlaCarteOpen] = useState(false);

  const tabs: { key: Tab; label: string }[] = [
    { key: "general", label: s.tabs.general },
    { key: "academic", label: s.tabs.academic },
    { key: "business", label: s.tabs.business },
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{s.heroTitle}</h1>
          <p className="text-xl text-gray-300 mb-1">{s.heroSubtitle}</p>
          <p className="text-sm text-gray-400">{s.heroSub2}</p>
        </div>
      </section>

      {/* Tab Bar */}
      <div className="sticky top-[60px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-accent text-accent"
                    : "border-transparent text-gray-500 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GENERAL ASSISTANCE TAB ── */}
      {activeTab === "general" && (
        <section className="py-20 bg-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-2">{s.general.title}</h2>
              <p className="text-body">{s.general.subtitle}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-lg mx-auto">
              <div className="bg-accent px-8 py-6 text-center">
                <p className="text-5xl font-bold text-white">{s.general.rate}</p>
                <p className="text-white/70 text-sm mt-1">{s.general.rateLabel}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {s.general.items.map((item) => (
                    <li key={item} className="flex gap-2 text-body text-sm">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
                >
                  {s.general.cta}
                </Link>
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  {s.general.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ACADEMIC SUPPORT TAB ── */}
      {activeTab === "academic" && (
        <>
          {/* Packages */}
          <section className="py-20 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary text-center mb-12">
                {s.packagesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-6">
                {s.academic.packages.map((pkg, i) => {
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
                        {s.mostPopular}
                      </span>
                    )}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-5">
                        <h3 className={`text-xl font-bold ${isPopular ? "text-white" : "text-primary"}`}>
                          {pkg.name}
                        </h3>
                      </div>
                      <p className={`text-4xl font-bold mb-1 ${isPopular ? "text-white" : "text-accent"}`}>
                        {pkg.price}
                      </p>
                      <p className={`text-sm mb-6 ${isPopular ? "text-white/60" : "text-gray-400"}`}>
                        {pkg.duration}
                      </p>
                      <ul className="space-y-3 flex-1 mb-8">
                        {pkg.features.map((f) => (
                          <li key={f.en} className="flex gap-2 items-start">
                            <svg
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
                        {s.packageCta}
                      </Link>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Community Credit */}
              <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-xl p-5 flex gap-4 items-start">
                <Lightbulb className="w-5 h-5 flex-shrink-0 text-accent-light mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary mb-1">{s.academic.communityCredit.text}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.academic.communityCredit.description}</p>
                </div>
              </div>
            </div>
          </section>

          {/* À la carte, collapsible */}
          <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <button
                onClick={() => setAlaCarteOpen(!alaCarteOpen)}
                className="w-full flex items-center justify-between text-left group"
              >
                <p className="text-base font-semibold text-primary group-hover:text-accent transition-colors">
                  {s.academic.alaCarte.toggle}
                </p>
                <svg
                  className={`w-5 h-5 text-accent transition-transform flex-shrink-0 ${alaCarteOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {alaCarteOpen && (
                <div className="mt-8">
                  <p className="text-center text-sm font-medium text-accent mb-8">
                    {s.academic.alaCarte.bundleNote}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {s.academic.alaCarte.stages.map((stage, i) => (
                      <div
                        key={stage.num}
                        className="bg-cream rounded-xl overflow-hidden shadow-sm"
                        style={{ borderLeft: `4px solid ${STAGE_COLORS[i] ?? "#6B8BAE"}` }}
                      >
                        <div className="p-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                            Stage {stage.num}
                          </p>
                          <h3 className="text-sm font-bold text-primary mb-4">{stage.name}</h3>
                          <ul className="space-y-3">
                            {stage.items.map((item) => (
                              <li key={item.label} className="flex justify-between gap-2 text-sm text-body">
                                <span className="leading-snug">{item.label}</span>
                                <span className="font-semibold text-accent whitespace-nowrap">{item.price}</span>
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
              )}
            </div>
          </section>

          {/* Founding note */}
          <div className="bg-cream border-t border-gray-100 py-4 text-center">
            <p className="text-sm text-gray-500 italic">{s.academic.foundingNote}</p>
          </div>
        </>
      )}

      {/* ── BUSINESS START-UP TAB ── */}
      {activeTab === "business" && (
        <>
          <section className="py-20 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary text-center mb-12">
                {s.packagesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-6">
                {s.business.packages.map((pkg, i) => {
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
                          {s.mostPopular}
                        </span>
                      )}
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${isPopular ? "text-white" : "text-primary"}`}>
                          {pkg.name}
                        </h3>
                        <p className={`text-4xl font-bold mb-1 ${isPopular ? "text-white" : "text-accent"}`}>
                          {pkg.price}
                        </p>
                        <p className={`text-sm mb-6 ${isPopular ? "text-white/60" : "text-gray-400"}`}>
                          {pkg.duration}
                        </p>
                        <ul className="space-y-3 flex-1 mb-8">
                          {pkg.features.map((f) => (
                            <li key={f} className={`flex gap-2 text-sm ${isPopular ? "text-white" : "text-body"}`}>
                              <svg
                                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{f}</span>
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
                          {s.packageCta}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-sm text-gray-400 italic">{s.business.foundingNote}</p>
            </div>
          </section>

          {/* Business À la carte */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary text-center mb-3">
                {s.business.alaCarte.title}
              </h2>
              <p className="text-center text-accent font-medium mb-12">{s.business.alaCarte.bundleNote}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {s.business.alaCarte.stages.map((stage, i) => (
                  <div
                    key={stage.name}
                    className="bg-cream rounded-xl overflow-hidden shadow-sm"
                    style={{ borderLeft: `4px solid ${BIZ_STAGE_COLORS[i] ?? "#6B8BAE"}` }}
                  >
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Stage {i + 1}
                      </p>
                      <h3 className="text-sm font-bold text-primary mb-4">{stage.name}</h3>
                      <ul className="space-y-3">
                        {stage.items.map((item) => (
                          <li key={item.label} className="flex justify-between gap-2 text-sm text-body">
                            <span className="leading-snug">{item.label}</span>
                            <span className="font-semibold text-accent whitespace-nowrap">{item.price}</span>
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
        </>
      )}

      {/* CTA */}
      <section className="py-16 bg-cream border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-3">{s.ctaHeading}</h2>
          <p className="text-body mb-6">{s.ctaSub}</p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
          >
            {s.ctaButton}
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {s.disclaimer}
        </p>
      </div>
    </>
  );
}
