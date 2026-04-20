"use client";

import { motion } from "framer-motion";
import ReleaseCard from "@/components/ReleaseCard";

const allReleases = [
  { title: "Midnight Signal", artist: "NOVA", cover: "/releases/release1.svg" },
  { title: "Shadow Protocol", artist: "DRAVEN", cover: "/releases/release2.svg" },
  { title: "Velvet Haze", artist: "LYRA", cover: "/releases/release3.svg" },
  { title: "Neon Abyss", artist: "ONYX", cover: "/releases/release4.svg" },
  { title: "Dark Frequency", artist: "CIPHER", cover: "/releases/release5.svg" },
  { title: "Void Walker", artist: "ECHO", cover: "/releases/release6.svg" },
  { title: "Pressure", artist: "RAZE", cover: "/releases/release7.svg" },
  { title: "Ghost Light", artist: "VEIL", cover: "/releases/release8.svg" },
  { title: "Chromatic", artist: "NOVA", cover: "/releases/release9.svg" },
  { title: "Cold Throne", artist: "DRAVEN", cover: "/releases/release10.svg" },
  { title: "Silk Evening", artist: "LYRA", cover: "/releases/release11.svg" },
  { title: "Afterglow", artist: "ONYX", cover: "/releases/release12.svg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ReleasesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {allReleases.map((release, i) => (
        <motion.div
          key={release.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <ReleaseCard {...release} />
        </motion.div>
      ))}
    </div>
  );
}
