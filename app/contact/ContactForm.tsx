"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import { useLanguage } from "@/components/LanguageProvider";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = t("form.errors.nameRequired");
    if (!form.email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }
    if (!form.message.trim()) newErrors.message = t("form.errors.messageRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("form.errors.generic"));
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t("form.errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30";

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-neon-purple/20 bg-zinc-950/50 p-12 text-center"
        >
          <div className="text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-white">{t("form.successTitle")}</h3>
          <p className="mt-3 text-zinc-400">
            {t("form.successText")}
          </p>
          <div className="mt-8">
            <Button variant="outline" onClick={() => setSuccess(false)}>
              {t("form.sendAnother")}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/5 bg-zinc-950/50 p-6 sm:p-8 backdrop-blur-sm"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("form.name")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t("form.namePlaceholder")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("form.email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("form.emailPlaceholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClasses}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder={t("form.messagePlaceholder")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClasses} resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-400 text-center">{serverError}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {t("form.sending")}
              </span>
            ) : (
              t("form.sendMessage")
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
