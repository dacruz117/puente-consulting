import Link from "next/link";

interface CTABannerProps {
  heading?: string;
  buttonText?: string;
  href?: string;
}

export default function CTABanner({
  heading = "Ready to get started?",
  buttonText = "Book a Consultation",
  href = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-accent py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{heading}</h2>
        <Link
          href={href}
          className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-cream transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
