import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Brand display serif. next/font self-hosts at build time — no runtime third-party request,
// which matches the prototype's decision to self-host the woff2.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivah Spot — Vendor Portal",
  description:
    "Manage your listings, availability, enquiries and subscription on Vivah Spot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
