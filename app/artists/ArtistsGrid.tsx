"use client";

import { motion } from "framer-motion";
import ArtistCard from "@/components/ArtistCard";

const allArtists = [
  { name: "NOVA", genre: "Electronic", image: "/artists/artist1.svg", description: "Pushing boundaries in electronic music with ethereal soundscapes." },
  { name: "DRAVEN", genre: "Hip-Hop", image: "/artists/artist2.svg", description: "Raw lyricism meets hard-hitting production." },
  { name: "LYRA", genre: "R&B / Soul", image: "/artists/artist3.svg", description: "Soulful melodies with modern R&B energy." },
  { name: "ONYX", genre: "Dark Pop", image: "/artists/artist4.svg", description: "Dark, cinematic pop with haunting vocals." },
  { name: "CIPHER", genre: "Trap", image: "/artists/artist5.svg", description: "Heavy 808s and atmospheric trap production." },
  { name: "ECHO", genre: "Ambient", image: "/artists/artist6.svg", description: "Ambient textures that transport listeners to other worlds." },
  { name: "RAZE", genre: "Drill", image: "/artists/artist7.svg", description: "Drill beats with a unique melodic twist." },
  { name: "VEIL", genre: "Indie", image: "/artists/artist8.svg", description: "Indie sound with electronic undertones." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ArtistsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {allArtists.map((artist, i) => (
        <motion.div
          key={artist.name}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <ArtistCard name={artist.name} genre={artist.genre} image={artist.image} />
        </motion.div>
      ))}
    </div>
  );
}
