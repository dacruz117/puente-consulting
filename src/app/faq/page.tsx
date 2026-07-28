"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqPage() {
  const { t } = useLanguage();
  const faq = t.faq;
  const dyk = t.didYouKnow;

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
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-light border border-accent-light/30 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            {faq.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{faq.heroTitle}</h1>
          <p className="text-lg text-gray-300">{faq.heroSubtitle}</p>
        </div>
      </section>

      {/* Q&A List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-6">
            {faq.items.map((item) => (
              <div key={item.question} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-2">{item.question}</h3>
                <p className="text-body leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Did You Know facts */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{dyk.heroTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{dyk.heroSubtitle}</p>
          </div>
          <div className="space-y-16">
            {dyk.categories.map((category) => (
              <div key={category.label}>
                <h3 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                  {category.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.facts.map((fact, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                    >
                      <p className="text-base text-primary leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.cta.defaultHeading} buttonText={t.cta.defaultButton} href="/contact" />
    </>
  );
}
