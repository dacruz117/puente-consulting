"use client";

import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.heroTitle}</h1>
          <p className="text-lg text-gray-300">{t.contact.heroSubtitle}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t.contact.sendMessage}
              </h2>
              <ContactForm />
            </div>

            {/* Calendly Embed */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t.contact.bookConsultation}
              </h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <p className="text-body mb-4">{t.contact.scheduleText}</p>
                <div className="aspect-[3/4] w-full">
                  <iframe
                    src="https://calendly.com/YOUR_CALENDLY_URL"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a consultation"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
