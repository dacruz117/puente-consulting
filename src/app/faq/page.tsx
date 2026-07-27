"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqPage() {
  const { t } = useLanguage();
  const faq = t.faq;

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
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {faq.items.map((item) => (
            <div key={item.question} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-2">{item.question}</h3>
              <p className="text-body leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.cta.defaultHeading} buttonText={t.cta.defaultButton} href="/contact" />
    </>
  );
}
