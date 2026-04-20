"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

interface Track {
  title: string;
  artist: string;
  src: string;
  cover?: string;
  gradient: string;
}

const CATEGORIES: { id: string; label: string; tracks: Track[] }[] = [
  {
    id: "music",
    label: "music.categories.music",
    tracks: [
      {
        title: "Chișinău de Seară",
        artist: "Tudo Taru x Wellmein",
        src: "/Music/Chisinaul de seara master1.wav",
        cover: "/Music/Chisinau de seara Artwork.jpg",
        gradient: "linear-gradient(135deg,#0a0a1a 0%,#1a1a3e 50%,#f59e0b 100%)",
      },
      {
        title: "ALTFEL",
        artist: "TUDO TARU x LYNA",
        src: "/Music/TUDO TARU x LYNA - ALTFEL WAV.wav",
        cover: "/Music/altfel.jpg",
        gradient: "linear-gradient(135deg,#2f1700 0%,#7a2f00 45%,#d97706 100%)",
      },
      {
        title: "HMP",
        artist: "WELLMEIN x MAX CARA",
        src: "/Music/HMP Master Final MPEG 2.mp3",
        cover: "/Music/HMP.jpg",
        gradient: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0ea5e9 100%)",
      },
    ],
  },
  {
    id: "instrumentals",
    label: "music.categories.instrumentals",
    tracks: [
      {
        title: "SMOKEY",
        artist: "WELLMEIN",
        src: "/Music/SMOKEY TAG.mp3",
        cover: "/Music/Smokey.jpg",
        gradient: "linear-gradient(135deg,#1c1917 0%,#57534e 50%,#e7e5e4 100%)",
      },
      {
        title: "HELLIO",
        artist: "WELLMEIN",
        src: "/Music/HELLIO TAG.mp3",
        cover: "/Music/hel;io photo 2.jpg",
        gradient: "linear-gradient(135deg,#1c0a00 0%,#7c2d12 50%,#f97316 100%)",
      },
    ],
  },
];

function fmt(s: number) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const { t } = useLanguage();
  const [catIdx, setCatIdx] = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDraggingSeek, setIsDraggingSeek] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const draggingSeekRef = useRef(false);
  const touchStartX = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const category = CATEGORIES[catIdx];
  const track = category.tracks[trackIdx];
  const useTopOfCover = track.cover?.includes("Smokey.jpg");

  // when track/category changes, reset and resume if playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    setDuration(0);
    if (playing && track.src) {
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx, catIdx]);

  // play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing]);

  const changeTrack = useCallback(
    (newIdx: number, dir: number) => {
      setDirection(dir);
      setTrackIdx(newIdx);
    },
    []
  );

  const prev = () =>
    changeTrack((trackIdx - 1 + category.tracks.length) % category.tracks.length, -1);
  const next = () =>
    changeTrack((trackIdx + 1) % category.tracks.length, 1);

  const switchCategory = (i: number) => {
    setDirection(i > catIdx ? 1 : -1);
    setCatIdx(i);
    setTrackIdx(0);
    setPlaying(false);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (draggingSeekRef.current) return;
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress(a.currentTime / a.duration);
    setDuration(a.duration);
  };

  const seekToClientX = useCallback((clientX: number) => {
    const a = audioRef.current;
    const bar = progressBarRef.current;
    if (!a || !bar || !a.duration) return;
    const r = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    a.currentTime = pct * a.duration;
    setProgress(pct);
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    seekToClientX(e.clientX);
  };

  const startSeekDrag = (clientX: number) => {
    draggingSeekRef.current = true;
    setIsDraggingSeek(true);
    seekToClientX(clientX);
  };

  const stopSeekDrag = useCallback(() => {
    draggingSeekRef.current = false;
    setIsDraggingSeek(false);
  }, []);

  useEffect(() => {
    if (!isDraggingSeek) return;

    const onMouseMove = (e: MouseEvent) => {
      seekToClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      e.preventDefault();
      seekToClientX(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopSeekDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stopSeekDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopSeekDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopSeekDrag);
    };
  }, [isDraggingSeek, seekToClientX, stopSeekDrag]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const d = touchStartX.current - e.changedTouches[0].clientX;
    if (d > 50) next();
    else if (d < -50) prev();
  };

  const coverVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "65%" : "-65%",
      opacity: 0,
      scale: 0.72,
      filter: "blur(16px)",
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] },
    },
    exit: (d: number) => ({
      x: d > 0 ? "-65%" : "65%",
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
    }),
  };

  const textVariants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.42, delay: 0.12, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] },
    },
    exit: (d: number) => ({
      x: d > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.22 },
    }),
  };

  return (
    <section className="relative bg-black py-20 px-4 overflow-hidden" id="player">
      {/* Full-section blurred cover background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${catIdx}-${trackIdx}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          {track.cover ? (
            <Image
              src={track.cover}
              alt=""
              fill
              className="object-cover"
              style={{ filter: "blur(18px)", transform: "scale(1.08)", opacity: 0.45 }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: track.gradient,
                filter: "blur(40px)",
                transform: "scale(1.2)",
                opacity: 0.25,
              }}
            />
          )}
          {/* Blend with black top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        {/* Category switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => switchCategory(i)}
                className="relative px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-colors duration-200"
              >
                {catIdx === i && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    catIdx === i ? "text-black" : "text-white/50 hover:text-white"
                  }`}
                >
                    {t(cat.label)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="relative">
          {/* Ambient glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`glow-${catIdx}-${trackIdx}`}
              className="absolute inset-0 rounded-[36px] blur-3xl -z-10"
              style={{ background: track.gradient, opacity: 0.35, transform: "scale(0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>

          <div
            className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-[36px] overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Cover */}
            <div
              className="relative px-8 pt-8 pb-4 flex justify-center"
              style={{ perspective: "900px" }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                // square aspect ratio
              >
                <div style={{ paddingBottom: "100%", position: "relative" }}>
                  {/* Ambient behind cover */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`ambient-${catIdx}-${trackIdx}`}
                      className="absolute inset-[-30%] rounded-full z-0"
                      style={{ background: track.gradient, filter: "blur(40px)", opacity: 0.55 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.55 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </AnimatePresence>

                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={`cover-${catIdx}-${trackIdx}`}
                      custom={direction}
                      variants={coverVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 z-10"
                    >
                      {track.cover ? (
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          className={useTopOfCover ? "object-cover object-top" : "object-cover"}
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ background: track.gradient }}
                        />
                      )}
                      {/* Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Track info */}
            <div className="text-center px-8 py-4 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={`info-${catIdx}-${trackIdx}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {track.title}
                  </h2>
                  <p className="text-white/40 text-xs font-bold mt-1 tracking-[0.2em] uppercase">
                    {track.artist}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="px-8 pt-2 pb-1">
              <div
                ref={progressBarRef}
                className="w-full h-[3px] bg-white/10 rounded-full cursor-pointer group mb-2"
                onClick={seek}
                onMouseDown={(e) => {
                  e.preventDefault();
                  startSeekDrag(e.clientX);
                }}
                onTouchStart={(e) => {
                  if (!e.touches[0]) return;
                  startSeekDrag(e.touches[0].clientX);
                }}
              >
                <div
                  className="h-full rounded-full relative"
                  style={{
                    width: `${progress * 100}%`,
                    background: "white",
                    transition: "width 0.1s linear",
                  }}
                >
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-lg ${
                      isDraggingSeek ? "scale-100" : "scale-0 group-hover:scale-100"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-white/25 font-medium">
                <span>{fmt(progress * duration)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-10 pt-4 pb-6">
              <motion.button
                whileTap={{ scale: 0.86 }}
                onClick={prev}
                className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPlaying(!playing)}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black"
                style={{ boxShadow: "0 0 50px rgba(255,255,255,0.25)" }}
              >
                {playing ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginLeft: 3 }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.86 }}
                onClick={next}
                className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                </svg>
              </motion.button>
            </div>

            {/* Track dots */}
            <div className="flex justify-center gap-2 pb-7">
              {category.tracks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > trackIdx ? 1 : -1);
                    setTrackIdx(i);
                  }}
                >
                  <motion.div
                    animate={{
                      width: i === trackIdx ? 24 : 8,
                      opacity: i === trackIdx ? 1 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="h-2 rounded-full bg-white"
                  />
                </button>
              ))}
            </div>

            <audio
              ref={audioRef}
              src={track.src || undefined}
              onTimeUpdate={onTimeUpdate}
              onEnded={next}
              onLoadedMetadata={() =>
                setDuration(audioRef.current?.duration ?? 0)
              }
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
