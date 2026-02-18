import Link from "next/link";
import CTABanner from "@/components/CTABanner";

const differentiators = [
  {
    title: "Personalized Guidance",
    description:
      "Every client receives a custom strategy tailored to their unique goals and circumstances.",
  },
  {
    title: "Proven Process",
    description:
      "Our structured approach has helped countless students and entrepreneurs reach their goals.",
  },
  {
    title: "End-to-End Support",
    description:
      "From initial consultation to final results, we walk alongside you every step of the way.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bridging You to Your Next Chapter
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Expert college advising and business start-up consulting to help you
            take the next step with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/college-advising"
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              College Advising
            </Link>
            <Link
              href="/business-startup"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Business Start-Up
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* College Advising Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-3">
                College Advising
              </h3>
              <p className="text-body mb-6">
                Navigate the college admissions process with expert guidance.
                From school selection to application strategy, we help students
                find their best-fit institutions.
              </p>
              <Link
                href="/college-advising"
                className="text-accent font-semibold hover:text-accent-light transition-colors"
              >
                Learn More &rarr;
              </Link>
            </div>

            {/* Business Start-Up Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-3">
                Business Start-Up
              </h3>
              <p className="text-body mb-6">
                Turn your business idea into reality. We provide the strategic
                guidance and practical support you need to launch and grow your
                venture.
              </p>
              <Link
                href="/business-startup"
                className="text-accent font-semibold hover:text-accent-light transition-colors"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why PUENTE */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Why PUENTE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
