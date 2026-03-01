import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Condensed } from "next/font/google";

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
  description: "Decision intelligence for land, infrastructure, and capital deployment.",
  icons: {
    icon: "/logo-kolabs.png",
    shortcut: "/logo-kolabs.png",
    apple: "/logo-kolabs.png",
  },
};
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
