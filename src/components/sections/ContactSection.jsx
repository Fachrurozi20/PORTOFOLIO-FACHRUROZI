"use client";

import { useContact } from "@/hooks/useContact";
import Skeleton from "@/components/ui/Skeleton";

export default function ContactSection() {
  const { contact, loading } = useContact();

  if (loading) {
  return (
    <section className="py-20 text-center space-y-4">
      <Skeleton className="h-6 w-64 mx-auto" />
      <Skeleton className="h-6 w-40 mx-auto" />
      <Skeleton className="h-6 w-80 mx-auto" />
    </section>
  );
}

  const socials = contact.socials || {};

  return (
    <section 
    id="contact"
    className="py-10 relative overflow-hidden
             bg-gradient-to-b from-[var(--bg-soft)] to-[var(--bg-main)] text-center">
      <h2 className="text-[var(--accent)] hover:underline">
        Contact
      </h2>

      <p>{contact.email}</p>
      <p>{contact.phone}</p>

      <div className="flex justify-center gap-4">
        {Object.entries(socials).map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            className="text-blue-500 capitalize"
          >
            {name}
          </a>
        ))}
      </div>
    </section>
  );
}
