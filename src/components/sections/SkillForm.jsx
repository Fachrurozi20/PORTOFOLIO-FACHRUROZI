"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SkillForm({ onSubmit, submitting }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    await onSubmit(
      { name, level },
      imageFile
    );

    setName("");
    setLevel("");
    setImageFile(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-3"
    >
      <Input
        placeholder="Skill name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Level (Beginner / Intermediate / Expert)"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImageFile(e.target.files[0])
        }
      />

      <Button disabled={submitting}>
        {submitting ? "Saving..." : "Add Skill"}
      </Button>
    </form>
  );
}
