"use client";

import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function CollegeAdvisingPage() {
  const { t } = useLanguage();
  const ca = t.collegeAdvising;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-light border border-accent-light/30 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            {ca.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{ca.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">{ca.heroSub}</p>
          <p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              {ca.heroCta}
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white transition-colors"
            >
              {ca.heroPricing}
            </Link>
          </div>
        </div>
      </section>

      {/* Story Block */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4 leading-snug">{ca.storyHeading}</h2>
              <p className="text-body mb-4">{ca.storyP1}</p>
              <p className="text-body mb-6">{ca.storyP2}</p>
              <div className="border-l-4 border-accent bg-cream rounded-r-xl p-5">
                <p className="text-primary italic leading-relaxed mb-2">&#8220;{ca.storyQuote}&#8221;</p>
                <p className="text-sm text-gray-400">{ca.storyQuoteAttr}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ca.stats.map((stat) => (
                <div key={stat.label} className="bg-cream border border-gray-100 rounded-xl p-5">
                  <p className="text-3xl font-bold text-primary mb-1 leading-none">{stat.number}</p>
                  <p className="text-xs text-gray-400 leading-snug mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 7-Stage Roadmap */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {ca.stagesEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{ca.stagesHeading}</h2>
          <p className="text-body mb-12 max-w-xl">{ca.stagesIntro}</p>

          <div className="divide-y divide-gray-100">
            {ca.stages.map((stage) => (
              <div key={stage.num} className="grid grid-cols-[64px_1fr] gap-6 py-8 items-start">
                <p className="text-5xl font-light text-accent-light leading-none pt-1">{stage.num}</p>
                <div>
                  <h3 className="text-base font-semibold text-primary mb-2">{stage.title}</h3>
                  <p className="text-sm text-body leading-relaxed mb-3">{stage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-accent bg-blue-50 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Bilingual Block */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">{ca.bilingualHeading}</h2>
              <p className="text-gray-400 mb-4">{ca.bilingualP1}</p>
              <p className="text-gray-400 mb-8">{ca.bilingualP2}</p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {ca.bilingualCta}
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-light mb-4">
                {ca.bilingualCardLabel}
              </p>
              <div className="divide-y divide-white/10">
                {ca.bilingualTerms.map((term) => (
                  <div key={term.en} className="flex gap-4 py-3">
                    <span className="text-sm text-white/80 flex-1">{term.en}</span>
                    <span className="text-sm text-white/40 flex-1 italic">{term.es}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works + Scenarios */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {ca.processEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{ca.processHeading}</h2>
          <p className="text-body mb-10 max-w-xl">{ca.processIntro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {ca.processSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {ca.scenarios.map((scenario, i) => (
            <div key={i} className="mt-6 bg-white border border-gray-100 rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                {scenario.label}
              </p>
              <p className="text-lg italic text-primary mb-4 leading-relaxed">
                &#8220;{scenario.question}&#8221;
              </p>
              <p className="text-sm text-body leading-relaxed">{scenario.answer}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {scenario.stages.map((s) => (
                  <span key={s} className="text-xs text-body border border-gray-200 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={ca.ctaHeading} buttonText={ca.ctaButton} href="/contact" />

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {ca.disclaimer}
        </p>
      </div>
    </>
  );
}
