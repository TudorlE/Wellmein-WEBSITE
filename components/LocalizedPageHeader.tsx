"use client";

import { useLanguage } from "@/components/LanguageProvider";

interface LocalizedPageHeaderProps {
  titleKey: string;
  subtitleKey: string;
}

export default function LocalizedPageHeader({
  titleKey,
  subtitleKey,
}: LocalizedPageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl sm:text-6xl font-bold text-gradient">{t(titleKey)}</h1>
      <p className="mt-4 text-zinc-400 max-w-xl mx-auto">{t(subtitleKey)}</p>
    </div>
  );
}
