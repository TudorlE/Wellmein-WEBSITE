"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const navLinks = [
  { href: "#services", key: "nav.services" },
  { href: "#artists", key: "nav.artists" },
  { href: "#releases", key: "nav.releases" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black pt-24 pb-10">
      {/* Brand image */}
      <div className="flex justify-center mb-16 px-4">
        <Image
          src="/WELLMEIN flow of sound.png"
          alt="Wellmein Flow of Sound"
          width={400}
          height={90}
          className="w-auto max-w-xs h-auto brightness-0 invert"
          priority
        />
      </div>

      {/* Nav links */}
      <nav className="flex flex-wrap justify-center gap-10 mb-20 px-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-base font-bold tracking-widest text-white uppercase hover:text-zinc-400 transition-colors"
          >
            {t(link.key)}
          </a>
        ))}
      </nav>

      {/* Contact columns */}
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 text-center mb-20 px-4">
        <div>
          <p className="text-sm font-semibold text-zinc-500 mb-3">{t("footer.booking")}</p>
          <p className="text-base font-medium text-white">+373 60996996</p>
          <p className="text-base font-medium text-white">wellmeinbeats@gmail.com</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-500 mb-3">{t("footer.office")}</p>
          <p className="text-base font-medium text-white">+373 60996996</p>
          <p className="text-base font-medium text-white">tudotaru@gmail.com</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-500 mb-3">{t("footer.studioAddress")}</p>
          <p className="text-base font-medium text-white">Alexei Mateevici St 60,</p>
          <p className="text-base font-medium text-white">Chișinău, Moldova</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        {/* Circle logo icon */}
        <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">W</span>
        </div>

        <p className="text-sm text-zinc-500 text-center">
          &copy; {new Date().getFullYear()} WELLMEIN. {t("footer.rights")}
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {/* Instagram */}
          <a href="https://www.instagram.com/wellmein/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-zinc-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/wellmein" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-zinc-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
