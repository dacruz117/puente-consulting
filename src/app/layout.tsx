import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PUENTE Consulting Co.",
    template: "%s | PUENTE Consulting Co.",
  },
  description:
    "College advising and business start-up consulting services. Bridging you to your next chapter.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PUENTE Consulting Co.",
    title: "PUENTE Consulting Co.",
    description:
      "College advising and business start-up consulting services. Bridging you to your next chapter.",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
