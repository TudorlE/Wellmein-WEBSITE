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
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.3 },
            }}
            className="cursor-pointer"
          >
            <Image
              src="/WELLMEIN PNG 1.png"
              alt="Wellmein"
              width={900}
              height={200}
              className="h-14 sm:h-20 md:h-26 w-auto brightness-0 invert"
              priority
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
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/wellmein/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-100 hover:text-white"
                  >
                    {t("contact.instagram")}
                  </a>
                  <a
                    href="https://www.facebook.com/wellmein"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-100 hover:text-white"
                  >
                    {t("contact.facebook")}
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
