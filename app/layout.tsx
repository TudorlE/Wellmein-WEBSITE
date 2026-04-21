import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollActivityWatcher from "@/components/ScrollActivityWatcher";
import LanguageProvider from "@/components/LanguageProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/Service/favicon wellmein.ico",
  },
  title: {
    default: "Wellmein — Sound. Identity. Vision.",
    template: "%s | Wellmein",
  },
  description:
    "Wellmein is a premium music brand offering production, mixing, mastering, artist branding, and beat licensing.",
  keywords: [
    "music production",
    "mixing",
    "mastering",
    "artist branding",
    "beat licensing",
    "Wellmein",
  ],
  openGraph: {
    title: "Wellmein — Sound. Identity. Vision.",
    description:
      "Premium music brand experience. Production, mixing, mastering, and more.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white">
        <LanguageProvider>
          <ScrollActivityWatcher />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
