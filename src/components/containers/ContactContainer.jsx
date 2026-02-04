"use client";

import { useContact } from "@/hooks/useContact";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactContainer() {
  const { contact, loading, saving, saveContact } =
    useContact();

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Contact Settings
      </h1>

      <ContactForm
        contact={contact}
        saving={saving}
        onSubmit={saveContact}
      />
    </div>
  );
}
