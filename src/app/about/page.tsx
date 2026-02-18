import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About | PUENTE Consulting Co.",
  description:
    "Learn about PUENTE Consulting Co. — our mission, story, and commitment to bridging you to your next chapter.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About PUENTE
          </h1>
          <p className="text-lg text-gray-300">
            Bridging the gap between where you are and where you want to be.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
          <div className="space-y-4 text-body leading-relaxed">
            <p>
              PUENTE — meaning &ldquo;bridge&rdquo; in Spanish — was founded on
              the belief that everyone deserves access to expert guidance when
              making life&apos;s biggest decisions.
            </p>
            <p>
              Whether you&apos;re a student navigating the college admissions
              process or an aspiring entrepreneur ready to launch your first
              business, we provide the personalized support and proven strategies
              you need to succeed.
            </p>
            <p>
              {/* TODO: Replace with your actual story */}
              Our team brings years of experience in education consulting and
              business development, and we&apos;re passionate about helping our
              clients reach their full potential.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
            Our Mission
          </h2>
          <p className="text-body leading-relaxed">
            To provide accessible, personalized consulting that empowers
            students and entrepreneurs to take their next step with confidence.
            We bridge the gap between ambition and achievement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        heading="Let's Work Together"
        buttonText="Book a Consultation"
      />
    </>
  );
}
