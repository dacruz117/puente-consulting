import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | PUENTE Consulting Co.",
  description:
    "Get in touch with PUENTE Consulting Co. Book a consultation or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300">
            Ready to take the next step? Send us a message or book a
            consultation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Calendly Embed */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Book a Consultation
              </h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                {/* TODO: Replace YOUR_CALENDLY_URL with your actual Calendly link */}
                <p className="text-body mb-4">
                  Schedule a free consultation at a time that works for you.
                </p>
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
