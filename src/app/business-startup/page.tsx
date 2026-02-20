"use client";

import ServicePage from "@/components/ServicePage";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessStartupPage() {
  const { t } = useLanguage();

  return (
    <ServicePage
      heroTitle={t.businessStartup.heroTitle}
      heroDescription={t.businessStartup.heroDescription}
      services={t.businessStartup.services}
      processSteps={t.businessStartup.processSteps}
    />
  );
}
