"use client";

import { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/services/skill.service";

import { deleteSkillImage } from "@/services/skillStorage.service";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  async function addSkill(payload) {
    setSubmitting(true);
    try {
      const newSkill = await createSkill(payload);
      setSkills((prev) => [newSkill, ...prev]);
      return newSkill;
    } finally {
      setSubmitting(false);
    }
  }

  async function editSkill(id, payload) {
    setSubmitting(true);
    try {
      const updated = await updateSkill(id, payload);
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function removeSkill(skill) {
    try {
      if (skill.image_path) {
        await deleteSkillImage(skill.image_path);
      }

      await deleteSkill(skill.id);

      setSkills((prev) =>
        prev.filter((s) => s.id !== skill.id)
      );
    } catch (err) {
      console.error("DELETE SKILL ERROR:", err);
      alert("Delete failed");
    }
  }

  return {
    skills,
    loading,
    submitting,
    addSkill,
    editSkill,
    removeSkill,
  };
}
