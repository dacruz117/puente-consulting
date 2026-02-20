import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Puente Bilingual Services",
    template: "%s | Puente Bilingual Services",
  },
  description:
    "Bilingual guidance for everyday life. Helping Spanish-speaking families navigate digital systems, paperwork, and everyday processes with confidence.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Puente Bilingual Services",
    title: "Puente Bilingual Services",
    description:
      "Bilingual guidance for everyday life. Helping Spanish-speaking families navigate digital systems, paperwork, and everyday processes with confidence.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-cream text-body`}>
        <ClientProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
