"use client";

import Link from "next/link";
import Image from "next/image";
import { ClipboardList, GraduationCap, Briefcase, ChevronDown, Monitor } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

const cardIcons = {
  "/services":         <ClipboardList className="w-6 h-6 text-accent-light" />,
  "/college-advising": <GraduationCap className="w-6 h-6 text-accent-light" />,
  "/business-startup": <Briefcase     className="w-6 h-6 text-accent-light" />,
  "/web-design":       <Monitor       className="w-6 h-6 text-accent-light" />,
};

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-primary text-white pt-20 pb-0 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <p className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-light border border-accent-light/30 px-4 py-1 rounded-full mb-6">
            {h.heroEyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            {h.heroTitle}
          </h1>
          <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
            {h.heroSubtitle}
          </p>

          {/* Hero service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10">
            {h.heroCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-6 text-left group"
              >
                <div className="mb-3">{cardIcons[card.href]}</div>
                <h3 className="text-base font-bold text-white mb-1">{card.name}</h3>
                <p className="text-xs text-white/45 leading-relaxed mb-4">{card.description}</p>
                <span className="text-xs font-semibold text-accent-light uppercase tracking-wide">
                  {card.priceLabel}
                </span>
              </Link>
            ))}
          </div>

          {/* scroll indicator */}
          <div className="flex justify-center pt-6 pb-2">
            <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
          </div>
        </div>

        {/* fade into next section */}
        <div className="relative z-10 h-16 bg-gradient-to-b from-transparent to-accent mt-2" />
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-accent py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">
            {h.whoEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
            {h.whoTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {h.personas.map((persona) => (
              <div
                key={persona.href}
                className="bg-white/[0.06] border border-white/10 rounded-xl p-6"
              >
                <p className="text-sm text-white/85 italic leading-relaxed border-l-2 border-accent-light pl-3 mb-4">
                  {persona.quote}
                </p>
                <Link
                  href={persona.href}
                  className="text-xs font-semibold text-accent-light uppercase tracking-wide hover:text-white transition-colors"
                >
                  {persona.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SNAPSHOTS ── */}
      <section className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {h.snapshotsEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight">
            {h.snapshotsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {h.snapshots.map((snap) => (
              <div
                key={snap.href}
                className={`bg-white rounded-2xl border flex flex-col p-7 ${
                  snap.featured
                    ? "border-accent ring-1 ring-accent"
                    : "border-gray-200"
                }`}
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full mb-4 self-start">
                  {snap.tag}
                </span>
                <h3 className="text-base font-bold text-primary mb-1">{snap.title}</h3>
                <p className="text-xs text-body leading-relaxed mb-4">{snap.description}</p>
                <ul className="space-y-1 mb-4 flex-1">
                  {snap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-accent font-bold mt-px">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-accent mb-4">{snap.price}</p>
                <Link
                  href={snap.href}
                  className="self-start bg-accent text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
                >
                  {snap.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BLOCK ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="/profile.png"
                alt="Puente founder"
                width={480}
                height={360}
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                {h.trustEyebrow}
              </p>
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">
                {h.trustTitle}
              </h2>
              <p className="text-sm text-body leading-relaxed mb-6">{h.trustParagraph}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {h.trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <p className="text-sm italic text-primary border-l-4 border-accent pl-4 leading-relaxed">
                {h.trustGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <CTABanner />
    </>
  );
}
