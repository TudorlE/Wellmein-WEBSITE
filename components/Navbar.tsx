"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const navLinks = [
  { href: "#services", key: "nav.services" },
  { href: "#artists", key: "nav.artists" },
  { href: "#releases", key: "nav.releases" },
  { href: "#contact", key: "nav.contact" },
];

const LANGS = [
  { id: "en" as const, icon: "EN", title: "English" },
  { id: "ro" as const, icon: "🇷🇴", title: "Romana" },
  { id: "ru" as const, icon: "🇷🇺", title: "Russkiy" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.12]"
            : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center">

            {/* Mobile logo — centrat, doar pe telefon */}
            <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center">
              <a href="#" aria-label="Wellmein Home">
                <Image
                  src="/Wellmein 3.webp"
                  alt="Wellmein"
                  width={140}
                  height={40}
                  className="h-9 w-auto"
                  priority
                />
              </a>
            </div>

            {/* Desktop logo — stanga, doar pe md+ */}
            <div className="hidden md:flex items-center">
              <a href="#" aria-label="Wellmein Home">
                <Image
                  src="/Wellmein 3.webp"
                  alt="Wellmein"
                  width={160}
                  height={45}
                  className="h-10 w-auto"
                  priority
                />
              </a>
            </div>

            {/* Desktop nav — centrat */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-3 transition-all duration-700 ${
                  scrolled
                    ? "bg-black/75 backdrop-blur-2xl border border-white/20 shadow-[0_12px_34px_rgba(0,0,0,0.38)]"
                    : "bg-black/30 border border-white/10"
                }`}
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.45 }}
                    onHoverStart={() => setActiveLink(link.href)}
                    onHoverEnd={() => setActiveLink("")}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-6 py-2.5 text-base font-semibold text-zinc-100 transition-colors duration-200 rounded-full"
                  >
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/25 via-amber-300/20 to-cyan-400/25 border border-white/20"
                        transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10 tracking-wide">{t(link.key)}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex-1" />

            <div className="hidden md:flex items-center gap-2">
              {LANGS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLang(item.id)}
                  title={item.title}
                  className={`h-9 w-9 rounded-full border text-[11px] font-bold tracking-wide transition-all ${
                    lang === item.id
                      ? "border-white/70 bg-white text-black shadow-[0_0_0_4px_rgba(255,255,255,0.1)]"
                      : "border-white/25 bg-black/35 text-white hover:border-white/55"
                  }`}
                  aria-label={item.title}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {/* Hamburger mobil */}
            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-xl border border-white/20 bg-black/40"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-6 bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-6 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-6 bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-semibold text-zinc-200 hover:text-white transition-colors tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </motion.a>
            ))}

            <div className="mt-2 flex items-center gap-3">
              {LANGS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLang(item.id)}
                  title={item.title}
                  className={`h-10 w-10 rounded-full border text-xs font-bold tracking-wide transition-all ${
                    lang === item.id
                      ? "border-white/80 bg-white text-black"
                      : "border-white/30 bg-black/40 text-white"
                  }`}
                  aria-label={item.title}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
