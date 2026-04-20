"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FlipCard from "@/components/FlipCard";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    titleKey: "services.musicProduction.title",
    descriptionKey: "services.musicProduction.description",
    image: "/Service/Prodcution.png",
  },
  {
    titleKey: "services.mixing.title",
    descriptionKey: "services.mixing.description",
    image: "/Service/Mixing.jpg",
  },
  {
    titleKey: "services.videos.title",
    descriptionKey: "services.videos.description",
    image: "/Service/Video.jpg",
  },
  {
    titleKey: "services.branding.title",
    descriptionKey: "services.branding.description",
    image: "/artists/DeaNessa.jpg",
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="services"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-200 via-amber-100 to-cyan-200 bg-clip-text text-transparent"
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-zinc-100/90 max-w-2xl mx-auto text-lg font-light"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.titleKey}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <FlipCard
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                image={service.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
