"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.heroTitle}</h1>
          <p className="text-lg text-gray-300">{t.contact.heroSubtitle}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {t.contact.sendMessage}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{t.contact.preferMessage}</p>
          <p className="text-body mb-4">
            {t.contact.emailUs}{" "}
            <a
              href="mailto:info@puenteco.org"
              className="text-accent hover:underline font-medium"
            >
              info@puenteco.org
            </a>
          </p>
          <ContactForm />
          <p className="text-xs text-gray-400 text-center mt-4">{t.contact.responseTime}</p>
        </div>
      </section>
    </>
  );
}
