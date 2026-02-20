"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface CTABannerProps {
  heading?: string;
  buttonText?: string;
  href?: string;
}

export default function CTABanner({
  heading,
  buttonText,
  href = "/contact",
}: CTABannerProps) {
  const { t } = useLanguage();
  const displayHeading = heading ?? t.cta.defaultHeading;
  const displayButton = buttonText ?? t.cta.defaultButton;

  return (
    <section className="bg-accent py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{displayHeading}</h2>
        <Link
          href={href}
          className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-cream transition-colors"
        >
          {displayButton}
        </Link>
      </div>
    </section>
  );
}
