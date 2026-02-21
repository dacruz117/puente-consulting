"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function TranslationServicesPage() {
  const { t } = useLanguage();
  const ts = t.translationServices;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{ts.heroTitle}</h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            {ts.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              {ts.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              {ts.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl font-semibold text-primary mb-6 leading-relaxed">
                {ts.overviewTagline}
              </p>
              <div className="space-y-4 text-body leading-relaxed">
                {ts.overviewParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/laptop-professional.jpg"
                alt="Professional translation assistance"
                width={480}
                height={320}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">{ts.servicesTitle}</h2>
          <ul className="space-y-3 mb-6">
            {ts.serviceBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-body">
                <span className="text-accent mt-1 flex-shrink-0">&#10003;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 italic">{ts.servicesPricingNote}</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">{ts.pricingTitle}</h2>
          <ul className="space-y-3 mb-6">
            {ts.pricingBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-body">
                <span className="text-accent mt-1 flex-shrink-0">&#10003;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-body mb-2">{ts.pricingEstimate}</p>
          <p className="font-semibold text-primary">{ts.pricingTagline}</p>
        </div>
      </section>

      {/* Confidentiality */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">
            {ts.confidentialityTitle}
          </h2>
          <div className="space-y-4 text-body leading-relaxed">
            {ts.confidentialityParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border border-gray-300 rounded-xl p-8 bg-white">
            <h3 className="text-lg font-bold text-primary mb-4">
              {ts.disclaimerTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {ts.disclaimerText}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">{ts.ctaHeading}</h2>
          <p className="text-gray-300 mb-8 text-lg">{ts.ctaSubheading}</p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white font-semibold px-10 py-4 rounded-lg hover:bg-accent-light transition-colors text-lg"
          >
            {ts.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
