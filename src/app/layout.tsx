import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUENTE Consulting Co.",
  description:
    "College advising and business start-up consulting services. Bridging you to your next chapter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-cream text-body">{children}</body>
    </html>
  );
}
