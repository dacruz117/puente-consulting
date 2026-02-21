"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

interface Service {
  title: string;
  description: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServicePageProps {
  heroTitle: string;
  heroDescription: string;
  services: readonly Service[];
  processSteps: readonly ProcessStep[];
}

export default function ServicePage({
  heroTitle,
  heroDescription,
  services,
  processSteps,
}: ServicePageProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-lg text-gray-300">{heroDescription}</p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.servicePage.whatWeOffer}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-body">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.servicePage.ourProcess}
          </h2>
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-body">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
