import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Business Start-Up | PUENTE Consulting Co.",
  description:
    "Strategic guidance to launch and grow your business — from idea to execution.",
};

const services = [
  {
    title: "Business Plan Development",
    description:
      "We help you craft a clear, actionable business plan that defines your vision, market, and path to profitability.",
  },
  {
    title: "Market Research & Strategy",
    description:
      "Understand your target market, competition, and positioning to make informed decisions from day one.",
  },
  {
    title: "Launch Strategy",
    description:
      "From branding to go-to-market, we guide you through the critical steps to launch with confidence.",
  },
  {
    title: "Operations & Growth",
    description:
      "Set up the systems, processes, and strategies you need to run and scale your business effectively.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We start with a free consultation to understand your business idea, goals, and where you need the most support.",
  },
  {
    step: 2,
    title: "Custom Plan",
    description:
      "We build a tailored roadmap covering your business model, market strategy, and launch timeline.",
  },
  {
    step: 3,
    title: "Execution & Support",
    description:
      "We work alongside you to execute the plan — building your foundation, refining your strategy, and preparing for launch.",
  },
];

export default function BusinessStartupPage() {
  return (
    <ServicePage
      heroTitle="Business Start-Up"
      heroDescription="Turn your business idea into reality with strategic guidance and hands-on support."
      services={services}
      processSteps={processSteps}
    />
  );
}
