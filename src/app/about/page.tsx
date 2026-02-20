"use client";

import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.about.heroTitle}
          </h1>
          <p className="text-lg text-gray-300">{t.about.heroSubtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">{t.about.ourStory}</h2>
          <div className="space-y-4 text-body leading-relaxed">
            <p>{t.about.story1}</p>
            <p>{t.about.story2}</p>
            <p>{t.about.story3}</p>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
            {t.about.ourMission}
          </h2>
          <p className="text-body leading-relaxed">{t.about.missionText}</p>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.about.ctaHeading} buttonText={t.about.ctaButton} />
    </>
  );
}
