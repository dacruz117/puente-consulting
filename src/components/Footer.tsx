import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">PUENTE Consulting Co.</h3>
            <p className="text-sm text-gray-400">
              Bridging you to your next chapter.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/college-advising" className="hover:text-white transition-colors">
                  College Advising
                </Link>
              </li>
              <li>
                <Link href="/business-startup" className="hover:text-white transition-colors">
                  Business Start-Up
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>email@puenteconsulting.com</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PUENTE Consulting Co. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
