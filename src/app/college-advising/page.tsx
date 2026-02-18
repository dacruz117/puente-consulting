import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "College Advising",
  description:
    "Expert college admissions guidance — from school selection to application strategy.",
};

const services = [
  {
    title: "School Selection Strategy",
    description:
      "We help you identify the best-fit colleges based on your academic profile, interests, and goals.",
  },
  {
    title: "Application Review",
    description:
      "Comprehensive review and feedback on your college applications to ensure they stand out.",
  },
  {
    title: "Essay Coaching",
    description:
      "One-on-one guidance to craft compelling personal statements and supplemental essays.",
  },
  {
    title: "Financial Aid Guidance",
    description:
      "Navigate scholarships, financial aid applications, and funding strategies to make college affordable.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We start with a free consultation to understand your goals, academic background, and what you're looking for in a college experience.",
  },
  {
    step: 2,
    title: "Custom Plan",
    description:
      "Based on our conversation, we create a personalized advising plan with a timeline, school list, and action items.",
  },
  {
    step: 3,
    title: "Execution & Support",
    description:
      "We work through the plan together — reviewing applications, refining essays, and preparing you for every step of the process.",
  },
];

export default function CollegeAdvisingPage() {
  return (
    <ServicePage
      heroTitle="College Advising"
      heroDescription="Navigate the college admissions process with expert guidance every step of the way."
      services={services}
      processSteps={processSteps}
    />
  );
}
