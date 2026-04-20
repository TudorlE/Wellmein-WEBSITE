import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import LocalizedPageHeader from "@/components/LocalizedPageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Wellmein team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <LocalizedPageHeader
          titleKey="pages.contact.title"
          subtitleKey="pages.contact.subtitle"
        />
        <ContactForm />
      </div>
    </main>
  );
}
