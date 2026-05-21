"use client";

import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function DidYouKnowPage() {
  const { t } = useLanguage();
  const dyk = t.didYouKnow;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dyk.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{dyk.heroSubtitle}</p>
        </div>
      </section>

      {/* Fact categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {dyk.categories.map((category) => (
            <div key={category.label}>
              <h2 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                {category.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.facts.map((fact, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col gap-4"
                  >
                    <p className="text-base text-primary leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
