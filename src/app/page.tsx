"use client";

import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.home.heroTitle}
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/college-advising"
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              {t.home.collegeAdvisingTitle}
            </Link>
            <Link
              href="/business-startup"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              {t.home.businessStartupTitle}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.home.ourServices}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* College Advising Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t.home.collegeAdvisingTitle}
              </h3>
              <p className="text-body mb-6">{t.home.collegeAdvisingDesc}</p>
              <Link
                href="/college-advising"
                className="text-accent font-semibold hover:text-accent-light transition-colors"
              >
                {t.home.learnMore}
              </Link>
            </div>

            {/* Business Start-Up Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t.home.businessStartupTitle}
              </h3>
              <p className="text-body mb-6">{t.home.businessStartupDesc}</p>
              <Link
                href="/business-startup"
                className="text-accent font-semibold hover:text-accent-light transition-colors"
              >
                {t.home.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why PUENTE */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.home.whyPuente}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.differentiators.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
