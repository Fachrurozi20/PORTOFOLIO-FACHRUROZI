"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function ProjectForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    github_url: "",
  });

  const [images, setImages] = useState([]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImagesChange(e) {
    setImages([...e.target.files]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    await onSubmit(form, images);

    setForm({
      title: "",
      description: "",
      type: "",
      github_url: "",
    });

    setImages([]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-3"
    >
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <Input
        name="type"
        placeholder="Type (Web / Mobile)"
        value={form.type}
        onChange={handleChange}
      />

      <Input
        name="github_url"
        placeholder="Github URL"
        value={form.github_url}
        onChange={handleChange}
      />

      {/* MULTI IMAGE INPUT */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImagesChange}
        className="text-sm"
      />

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              className="w-20 h-20 object-cover rounded"
              alt="preview"
            />
          ))}
        </div>
      )}

      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <Button disabled={submitting}>
        {submitting ? "Saving..." : "Add Project"}
      </Button>
    </form>
  );
}
