import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Condensed } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL, getMetadataRobots } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kolabs.Design",
  description: "Decision intelligence for land, real estate, infrastructure, and capital deployment.",
  metadataBase: new URL(SITE_URL),
  robots: getMetadataRobots(true),
  icons: {
    icon: "/logo-kolabs.png",
    shortcut: "/logo-kolabs.png",
    apple: "/logo-kolabs.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${robotoCondensed.variable} antialiased bg-soft-gray text-charcoal font-sans`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
