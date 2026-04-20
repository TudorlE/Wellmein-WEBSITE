"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FlipCardProps {
  title: string;
  description: string;
  image: string;
}

const gradients = [
  "from-purple-500 to-purple-700",
  "from-cyan-500 to-blue-600",
  "from-pink-500 to-purple-600",
  "from-orange-500 to-red-600",
];

const getGradient = (title: string) => {
  const index = (title.charCodeAt(0) + title.charCodeAt(1)) % gradients.length;
  return gradients[index];
};

const textColors = [
  "text-violet-200",
  "text-cyan-200",
  "text-rose-200",
  "text-amber-200",
];

const getTextColor = (title: string) => {
  const index = (title.charCodeAt(0) + title.charCodeAt(1)) % textColors.length;
  return textColors[index];
};

export default function FlipCard({ title, description, image }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const gradient = getGradient(title);
  const textColor = getTextColor(title);

  return (
    <motion.div
      className="h-[420px] cursor-pointer [perspective:1000px]"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <motion.div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_18px_55px_rgba(0,0,0,0.4)]"
        >
          <div className="w-full h-full relative">
            {/* Image background */}
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

            {/* Content */}
            <div className="absolute z-10 h-full w-full flex flex-col justify-end p-6">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]"
              >
                {title}
              </motion.h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1.5 mt-3 bg-white/80 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* ── BACK ── */}
        <motion.div
          style={{ backfaceVisibility: "hidden", rotateY: 180 }}
          className="absolute w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-slate-950/95 via-zinc-900/85 to-black/80 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-cyan-300/10" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className={`text-2xl font-bold ${textColor} mb-4`}
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-zinc-100/95 leading-relaxed text-sm font-light"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-6 h-px w-16 bg-gradient-to-r ${gradient} origin-center`}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
