"use client";

import SkillForm from "@/components/sections/SkillForm";
import SkillItemAdmin from "@/components/sections/SkillItemAdmin";

import { uploadSkillImage } from "@/services/skillStorage.service";
import { useSkills } from "@/hooks/useSkills";

export default function SkillContainer() {
  const {
    skills,
    loading,
    submitting,
    addSkill,
    removeSkill,
  } = useSkills();

  async function handleCreate(form, imageFile) {
    let imagePath = "";

    if (imageFile) {
      imagePath = await uploadSkillImage(imageFile);
    }

    await addSkill({
      ...form,
      image_path: imagePath,
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      <SkillForm
        onSubmit={handleCreate}
        submitting={submitting}
      />

      <ul className="space-y-3">
        {skills.map((s) => (
          <SkillItemAdmin
            key={s.id}
            skill={s}
            onDelete={removeSkill}
          />
        ))}
      </ul>

    </div>
  );
}
