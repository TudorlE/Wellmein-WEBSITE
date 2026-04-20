"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lock scroll while intro is playing
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleEnd() {
    setFadeOut(true);
    // After exit animation completes, unmount
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1200);
  }

  // Fallback: if video fails or is too long, auto-dismiss after 8s
  useEffect(() => {
    const timer = setTimeout(handleEnd, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Intro video */}
          <motion.video
            ref={videoRef}
            src="/Logo Wellmein NEW.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnd}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={
              fadeOut
                ? { opacity: 0, scale: 1.06 }
                : { opacity: 1, scale: 1 }
            }
            transition={
              fadeOut
                ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.6, ease: "easeOut", delay: 0.1 }
            }
            className="w-full h-full object-contain"
          />

          {/* Bottom gradient bleed so the site underneath shows through naturally */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
