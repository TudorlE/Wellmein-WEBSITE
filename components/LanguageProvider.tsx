"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ro" | "ru";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.services": "Services",
    "nav.artists": "Artists",
    "nav.releases": "Releases",
    "nav.contact": "Contact",

    "services.title": "Our Services",
    "services.subtitle": "We build sound, visuals and identity for artists who want to stand out.",
    "services.musicProduction.title": "Music Production",
    "services.musicProduction.description": "From idea to final track. We compose, arrange and produce music tailored to your unique sound.",
    "services.mixing.title": "Mixing & Mastering",
    "services.mixing.description": "Clean, powerful and industry-ready sound optimized for all platforms.",
    "services.videos.title": "Music Videos",
    "services.videos.description": "We create cinematic visuals that match your sound and elevate your identity.",
    "services.branding.title": "Artist Branding",
    "services.branding.description": "We build your image, style and visual identity to make you unforgettable.",

    "artists.title": "Artists",
    "artists.subtitle": "Meet the creators shaping the future of sound.",

    "releases.title": "New Releases",
    "releases.subtitle": "Fresh drops from the Wellmein roster.",

    "music.categories.music": "Music",
    "music.categories.instrumentals": "Instrumentals",

    "contact.title": "Contact us",
    "contact.general": "General Enquiries",
    "contact.team": "Wellmein Team",
    "contact.teamRole": "Creative Label & Production",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.social": "Social Media",
    "contact.instagram": "Instagram",
    "contact.facebook": "Facebook",

    "pages.artists.title": "Artists",
    "pages.artists.subtitle": "The creatives shaping the Wellmein sound.",
    "pages.releases.title": "Releases",
    "pages.releases.subtitle": "The latest drops from Wellmein.",
    "pages.contact.title": "Contact",
    "pages.contact.subtitle": "Have a project, question, or just want to say hi? We would love to hear from you.",

    "form.name": "Name",
    "form.email": "Email",
    "form.message": "Message",
    "form.namePlaceholder": "Your name",
    "form.emailPlaceholder": "your@email.com",
    "form.messagePlaceholder": "Tell us about your project...",
    "form.sendMessage": "Send Message",
    "form.sending": "Sending...",
    "form.successTitle": "Message Sent!",
    "form.successText": "Thanks for reaching out. We will get back to you soon.",
    "form.sendAnother": "Send Another",
    "form.errors.nameRequired": "Name is required.",
    "form.errors.emailRequired": "Email is required.",
    "form.errors.emailInvalid": "Enter a valid email address.",
    "form.errors.messageRequired": "Message is required.",
    "form.errors.generic": "Something went wrong.",

    "footer.booking": "Booking",
    "footer.office": "Office",
    "footer.studioAddress": "Studio Address",
    "footer.rights": "All rights reserved.",
  },
  ro: {
    "nav.services": "Servicii",
    "nav.artists": "Artiști",
    "nav.releases": "Lansări",
    "nav.contact": "Contact",

    "services.title": "Serviciile Noastre",
    "services.subtitle": "Construim sunet, vizual și identitate pentru artiști care vor să iasă în evidență.",
    "services.musicProduction.title": "Producție Muzicală",
    "services.musicProduction.description": "De la idee la track final. Compunem, aranjăm și producem muzică pe stilul tău.",
    "services.mixing.title": "Mixing & Mastering",
    "services.mixing.description": "Sunet curat, puternic și pregătit pentru standardele industriei pe toate platformele.",
    "services.videos.title": "Videoclipuri Muzicale",
    "services.videos.description": "Creăm vizualuri cinematice care se potrivesc cu sunetul tău și îți ridică identitatea.",
    "services.branding.title": "Branding de Artist",
    "services.branding.description": "Construim imaginea, stilul și identitatea ta vizuală ca să fii de neuitat.",

    "artists.title": "Artiști",
    "artists.subtitle": "Cunoaște creatorii care modelează viitorul sunetului.",

    "releases.title": "Lansări Noi",
    "releases.subtitle": "Piese noi din rosterul Wellmein.",

    "music.categories.music": "Muzică",
    "music.categories.instrumentals": "Instrumentale",

    "contact.title": "Contactează-ne",
    "contact.general": "Cereri Generale",
    "contact.team": "Echipa Wellmein",
    "contact.teamRole": "Label Creativ & Producție",
    "contact.phone": "Telefon",
    "contact.email": "Email",
    "contact.social": "Social Media",
    "contact.instagram": "Instagram",
    "contact.facebook": "Facebook",

    "pages.artists.title": "Artiști",
    "pages.artists.subtitle": "Creatorii care modelează sunetul Wellmein.",
    "pages.releases.title": "Lansări",
    "pages.releases.subtitle": "Cele mai noi piese de la Wellmein.",
    "pages.contact.title": "Contact",
    "pages.contact.subtitle": "Ai un proiect, o întrebare sau vrei doar să saluți? Ne-ar face plăcere să te auzim.",

    "form.name": "Nume",
    "form.email": "Email",
    "form.message": "Mesaj",
    "form.namePlaceholder": "Numele tău",
    "form.emailPlaceholder": "emailul@tau.com",
    "form.messagePlaceholder": "Spune-ne despre proiectul tău...",
    "form.sendMessage": "Trimite Mesaj",
    "form.sending": "Se trimite...",
    "form.successTitle": "Mesaj Trimis!",
    "form.successText": "Mulțumim pentru mesaj. Revenim în curând.",
    "form.sendAnother": "Trimite Altul",
    "form.errors.nameRequired": "Numele este obligatoriu.",
    "form.errors.emailRequired": "Emailul este obligatoriu.",
    "form.errors.emailInvalid": "Introdu o adresă de email validă.",
    "form.errors.messageRequired": "Mesajul este obligatoriu.",
    "form.errors.generic": "A apărut o eroare.",

    "footer.booking": "Rezervări",
    "footer.office": "Birou",
    "footer.studioAddress": "Adresă Studio",
    "footer.rights": "Toate drepturile rezervate.",
  },
  ru: {
    "nav.services": "Услуги",
    "nav.artists": "Артисты",
    "nav.releases": "Релизы",
    "nav.contact": "Контакт",

    "services.title": "Наши Услуги",
    "services.subtitle": "Мы создаем звук, визуал и идентичность для артистов, которые хотят выделяться.",
    "services.musicProduction.title": "Музыкальное Продюсирование",
    "services.musicProduction.description": "От идеи до финального трека. Мы пишем, аранжируем и продюсируем музыку под твой стиль.",
    "services.mixing.title": "Сведение и Мастеринг",
    "services.mixing.description": "Чистый, мощный и индустриальный звук для всех платформ.",
    "services.videos.title": "Музыкальные Видео",
    "services.videos.description": "Мы создаем кинематографичные визуалы, которые усиливают твой звук и образ.",
    "services.branding.title": "Артистический Брендинг",
    "services.branding.description": "Мы формируем твой образ, стиль и визуальную идентичность, чтобы тебя запомнили.",

    "artists.title": "Артисты",
    "artists.subtitle": "Познакомься с создателями, формирующими будущее звука.",

    "releases.title": "Новые Релизы",
    "releases.subtitle": "Свежие релизы от Wellmein.",

    "music.categories.music": "Музыка",
    "music.categories.instrumentals": "Инструменталы",

    "contact.title": "Свяжитесь с нами",
    "contact.general": "Общие Запросы",
    "contact.team": "Команда Wellmein",
    "contact.teamRole": "Креативный Лейбл и Продакшн",
    "contact.phone": "Телефон",
    "contact.email": "Email",
    "contact.social": "Соцсети",
    "contact.instagram": "Instagram",
    "contact.facebook": "Facebook",

    "pages.artists.title": "Артисты",
    "pages.artists.subtitle": "Креаторы, формирующие звучание Wellmein.",
    "pages.releases.title": "Релизы",
    "pages.releases.subtitle": "Свежие дропы от Wellmein.",
    "pages.contact.title": "Контакт",
    "pages.contact.subtitle": "Есть проект, вопрос или просто хочешь сказать привет? Мы будем рады услышать тебя.",

    "form.name": "Имя",
    "form.email": "Email",
    "form.message": "Сообщение",
    "form.namePlaceholder": "Ваше имя",
    "form.emailPlaceholder": "your@email.com",
    "form.messagePlaceholder": "Расскажите о вашем проекте...",
    "form.sendMessage": "Отправить Сообщение",
    "form.sending": "Отправка...",
    "form.successTitle": "Сообщение Отправлено!",
    "form.successText": "Спасибо за обращение. Мы скоро с вами свяжемся.",
    "form.sendAnother": "Отправить Еще",
    "form.errors.nameRequired": "Имя обязательно.",
    "form.errors.emailRequired": "Email обязателен.",
    "form.errors.emailInvalid": "Введите корректный email.",
    "form.errors.messageRequired": "Сообщение обязательно.",
    "form.errors.generic": "Что-то пошло не так.",

    "footer.booking": "Бронирование",
    "footer.office": "Офис",
    "footer.studioAddress": "Адрес Студии",
    "footer.rights": "Все права защищены.",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("wellmein-lang") as Lang | null;
    if (stored && ["en", "ro", "ru"].includes(stored)) {
      setLang(stored);
    }
  }, []);

  const handleSetLang = (nextLang: Lang) => {
    setLang(nextLang);
    window.localStorage.setItem("wellmein-lang", nextLang);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: handleSetLang,
      t: (key: string) => translations[lang][key] ?? translations.en[key] ?? key,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
