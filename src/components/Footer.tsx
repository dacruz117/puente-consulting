"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">Puente Bilingual Services</h3>
            <p className="text-sm text-gray-400">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/translation-services" className="hover:text-white transition-colors">
                  {t.footer.translationServices}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {t.footer.getInTouch}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>email@puenteconsulting.com</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.footer.bookSession}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs text-gray-500 max-w-3xl mx-auto">
          <p className="mb-4">{t.footer.disclaimer}</p>
          <p>
            &copy; {new Date().getFullYear()} Puente Bilingual Services. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
