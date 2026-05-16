"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { CALENDLY_URL } from "@/lib/constants";

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
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly — primary action */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t.contact.bookSession}
              </h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48 w-full">
                  <Image
                    src="/laptop-professional.jpg"
                    alt="Professional at laptop"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8">
                  <p className="text-body mb-4">{t.contact.scheduleText}</p>
                  <div
                    className="calendly-inline-widget"
                    data-url={CALENDLY_URL}
                    style={{ minWidth: "320px", height: "700px" }}
                  />
                  <script
                    type="text/javascript"
                    src="https://assets.calendly.com/assets/external/widget.js"
                    async
                  />
                </div>
              </div>
            </div>

            {/* Contact Form — secondary action */}
            <div>
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
          </div>
        </div>
      </section>
    </>
  );
}
