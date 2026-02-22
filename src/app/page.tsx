"use client";

import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import CheckIcon from "@/components/CheckIcon";
import { useLanguage } from "@/context/LanguageContext";

const howItWorksIcons = [
  // Phone / calendar
  <svg key="phone" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>,
  // Clipboard
  <svg key="clipboard" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  // Check circle
  <svg key="check" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export default function Home() {
  const { t } = useLanguage();

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.home.heroTitle}
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              {t.home.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              {t.home.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">
            {t.home.aboutTitle}
          </h2>
          <div className="space-y-4 text-body leading-relaxed">
            {t.home.aboutParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="text-accent font-semibold hover:text-accent-light transition-colors"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {t.home.serviceTitle}
              </h2>
              <p className="text-accent font-semibold text-lg mb-8">
                {t.home.servicePriceSuffix}
              </p>
              <ul className="space-y-3 mb-8">
                {t.home.serviceBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body">
                    <CheckIcon />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 italic">{t.home.serviceDisclaimer}</p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/man_smiling.webp"
                alt="Professional assistance"
                width={480}
                height={360}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.home.howItWorksTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {t.home.howItWorksSteps.map((step, idx) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4">
                  {howItWorksIcons[idx]}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-body">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-primary font-semibold text-lg">
            {t.home.howItWorksTagline}
          </p>
        </div>
      </section>

      {/* Why Trust Me */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/handshake.webp"
                alt="Trust and professionalism"
                width={480}
                height={320}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                {t.home.trustTitle}
              </h2>
              <ul className="space-y-3 mb-8">
                {t.home.trustBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body">
                    <CheckIcon />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-primary font-medium italic border-l-4 border-accent pl-4">
                {t.home.trustGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Services Upsell */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {t.home.upsellTitle}
          </h2>
          <p className="text-body mb-8">{t.home.upsellSubtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {t.home.upsellItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg px-6 py-4 shadow-sm border border-gray-100 text-body"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic">{t.home.upsellNote}</p>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
