"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

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
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.about.heroTitle}
          </h1>
          <p className="text-lg text-gray-300">{t.about.heroSubtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Headshot */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/profile.png"
                alt="Profile photo"
                width={320}
                height={380}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>

            {/* Story text */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">{t.about.ourStory}</h2>
              <div className="space-y-4 text-body leading-relaxed">
                {t.about.paragraphs.slice(0, 3).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <blockquote className="mt-8 border-l-4 border-accent pl-6 py-2">
                <p className="text-primary font-semibold text-lg leading-relaxed">
                  {t.about.paragraphs[3]}
                </p>
              </blockquote>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-6">
              {t.about.ourMission}
            </h2>
            <p className="text-body leading-relaxed">{t.about.missionText}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.about.ctaHeading} buttonText={t.about.ctaButton} />
    </>
  );
}
