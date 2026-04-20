"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/Section";
import ArtistCard from "@/components/ArtistCard";
import ReleaseCard from "@/components/ReleaseCard";
import ServicesSection from "@/components/ServicesSection";
import MusicPlayer from "@/components/MusicPlayer";
import { useLanguage } from "@/components/LanguageProvider";

const artists = [
  {
    name: "TUDO TARU",
    genre: "Pop/Rock",
    image: "/artists/tudor 3rd.png",
    socials: [
      { platform: "tiktok" as const, href: "https://www.tiktok.com/@tudotaru?is_from_webapp=1&sender_device=pc" },
      { platform: "instagram" as const, href: "https://www.instagram.com/tudotaru/" },
      { platform: "youtube" as const, href: "https://www.youtube.com/@Tudo_Taru" },
    ],
    streaming: [
      { platform: "spotify" as const, href: "https://open.spotify.com/artist/5jWOoQgSkOxd0eqh74K9qD?si=L3y7s5rLRGSMtPA2vugxig" },
      { platform: "apple" as const, href: "https://music.apple.com/us/artist/tudo-taru/1775251691" },
    ],
  },
  {
    name: "DEA NESSA",
    genre: "Pop",
    image: "/artists/deanessa fixed.jpeg",
    socials: [
      { platform: "tiktok" as const, href: "https://tiktok.com" },
      { platform: "instagram" as const, href: "https://instagram.com" },
      { platform: "youtube" as const, href: "https://youtube.com" },
    ],
    streaming: [
      { platform: "spotify" as const, href: "https://spotify.com" },
      { platform: "apple" as const, href: "https://music.apple.com" },
    ],
  },
  {
    name: "WELLMEIN",
    genre: "Producer/Electronic",
    image: "/artists/calin 2 nd.png",
    socials: [
      { platform: "tiktok" as const, href: "https://tiktok.com" },
      { platform: "instagram" as const, href: "https://instagram.com" },
      { platform: "youtube" as const, href: "https://youtube.com" },
    ],
    streaming: [
      { platform: "spotify" as const, href: "https://spotify.com" },
      { platform: "apple" as const, href: "https://music.apple.com" },
    ],
  },
];

const releases = [
  {
    title: "Piatra Rara",
    artist: "Tudo Taru",
    cover: "/Music/piatra rara c232.png",
    youtubeUrl: "https://www.youtube.com/watch?v=hbdmUY2xlAw",
  },
  {
    title: "ALTFEL",
    artist: "Tudo Taru x Lyna",
    cover: "/Music/altfel.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=t8QSk7voqAI",
  },
  {
    title: "Chișinău de Seară",
    artist: "Tudo Taru x Wellmein",
    cover: "/Music/Chisinau de seara Artwork.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=i0ix5Ulv_xE",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">

        {/* Inele pulsatoare — staggered, se repeta */}
        {[0, 0.55, 1.1].map((ringDelay, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ scale: [0.45, 1.9, 3.1], opacity: [0, 0.38, 0] }}
            transition={{
              duration: 3.0,
              delay: 1.0 + ringDelay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
            className="absolute pointer-events-none rounded-full border border-white/25"
            style={{ width: 540, height: 190 }}
          />
        ))}

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 55 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.35, ease: "easeOut" } }}
            className="cursor-pointer relative overflow-hidden"
          >
            <Image
              src="/WELLMEIN PNG 1.png"
              alt="Wellmein"
              width={900}
              height={200}
              className="h-14 sm:h-20 md:h-26 w-auto brightness-0 invert"
              priority
            />

            {/* Blur overlay — dispare la intrare */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
              className="absolute inset-0 pointer-events-none z-10 bg-black"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── MUSIC PLAYER ─── */}
      <MusicPlayer />

      {/* ─── SERVICES ─── */}
      <ServicesSection />

      {/* ─── ARTISTS ─── */}
      <Section id="artists">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-200 via-amber-100 to-cyan-200 bg-clip-text text-transparent">
            {t("artists.title")}
          </h2>
          <p className="mt-4 text-zinc-100/90 max-w-xl mx-auto">
            {t("artists.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <ArtistCard {...artist} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── NEW RELEASES ─── */}
      <Section id="releases">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-slate-100 to-rose-200 bg-clip-text text-transparent">
            {t("releases.title")}
          </h2>
          <p className="mt-4 text-zinc-100/90 max-w-xl mx-auto">
            {t("releases.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {releases.map((release, i) => (
            <motion.div
              key={release.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <ReleaseCard {...release} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="grid grid-cols-1 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
                {t("contact.title")}
              </h2>
            </motion.div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-10 sm:mt-14 sm:pt-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {t("contact.general")}
                </p>
                <p className="text-base font-medium text-zinc-100">{t("contact.team")}</p>
                <p className="mt-2 text-sm text-zinc-400">{t("contact.teamRole")}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {t("contact.phone")}
                </p>
                <p className="mt-1 text-zinc-100">+373 60996996</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {t("contact.email")}
                </p>
                <p className="mt-1 text-zinc-100">wellmeinbeats@gmail.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {t("contact.social")}
                </p>
                <div className="flex items-center gap-6 mt-2">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/wellmein/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-zinc-100 hover:text-white transition-colors hover:scale-110 duration-200"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/wellmein"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-zinc-100 hover:text-white transition-colors hover:scale-110 duration-200"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>


    </div>
  );
}
