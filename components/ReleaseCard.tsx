"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ReleaseCardProps {
  title: string;
  artist: string;
  cover: string;
  youtubeUrl?: string;
}

export default function ReleaseCard({ title, artist, cover, youtubeUrl }: ReleaseCardProps) {
  return (
    <motion.a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#d6c7a3] via-[#9aa88d] to-[#7f8f82] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.38)]"
    >
      <div className="relative aspect-[4/3]">
        {/* Vinyl disk behind cover */}
        <motion.div
          className="absolute right-1 top-1/2 z-0 h-[72%] aspect-square -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#1c1c1c_0%,#0d0d0d_55%,#000_100%)] shadow-[0_12px_26px_rgba(0,0,0,0.45)]"
          animate={{ x: 0, rotate: 0 }}
          whileHover={{ x: 12, rotate: 22 }}
          transition={{ type: "spring", stiffness: 170, damping: 20 }}
        >
          <div className="absolute inset-[16%] rounded-full border border-white/10" />
          <div className="absolute inset-[33%] rounded-full border border-white/8" />
          <div className="absolute inset-[47%] rounded-full bg-[#87a2a1] shadow-inner shadow-black/40" />
        </motion.div>

        {/* Album sleeve */}
        <motion.div
          className="relative z-10 h-full w-[74%] overflow-hidden rounded-xl border border-black/10 bg-black/20 shadow-[0_12px_30px_rgba(0,0,0,0.34)]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <Image
            src={cover}
            alt={`${title} by ${artist}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm ring-2 ring-white/55">
              <svg className="ml-0.5 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pt-4">
        <h3 className="truncate text-base font-extrabold uppercase tracking-wide text-[#1e2520] drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]">
          {title}
        </h3>
        <p className="mt-1 text-sm font-semibold tracking-[0.12em] text-[#2a342e]/85">{artist}</p>
      </div>
    </motion.a>
  );
}
