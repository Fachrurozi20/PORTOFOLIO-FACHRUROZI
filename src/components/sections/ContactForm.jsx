"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function ContactForm({
  contact,
  onSubmit,
  saving,
}) {
  const socials = contact.socials || {};

  const [email, setEmail] = useState(contact.email || "");
  const [phone, setPhone] = useState(contact.phone || "");

  const [linkedin, setLinkedin] = useState(
    socials.linkedin || ""
  );
  const [instagram, setInstagram] = useState(
    socials.instagram || ""
  );
  const [github, setGithub] = useState(
    socials.github || ""
  );

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      email,
      phone,
      socials: {
        linkedin,
        instagram,
        github,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-3"
    >
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
        placeholder="LinkedIn URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />

      <Input
        placeholder="Instagram URL"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <Input
        placeholder="Github URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <Button disabled={saving}>
        {saving ? "Saving..." : "Update Contact"}
      </Button>
    </form>
  );
}
