"use client";

import ServicePage from "@/components/ServicePage";
import { useLanguage } from "@/context/LanguageContext";

export default function CollegeAdvisingPage() {
  const { t } = useLanguage();

  return (
    <ServicePage
      heroTitle={t.collegeAdvising.heroTitle}
      heroDescription={t.collegeAdvising.heroDescription}
      services={t.collegeAdvising.services}
      processSteps={t.collegeAdvising.processSteps}
    />
  );
}
