"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="bg-white rounded-lg inline-block px-3 py-2 mb-3">
              <Image
                src="/logo.png"
                alt="Puente Consulting"
                width={130}
                height={48}
                className="object-contain h-10 w-auto"
              />
            </div>
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
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>email@puenteconsulting.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
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
