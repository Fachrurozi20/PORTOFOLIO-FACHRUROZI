"use client";

import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "@/services/project.service";
import { supabase } from "@/lib/supabase";
import { deleteMultipleProjectImages } from "@/services/storage.service";


export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  /* ======================
      CREATE PROJECT
  ====================== */
  async function addProject(payload) {
    setSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const newProject = await createProject({
        ...payload,
        created_by: user.id,
      });

      setProjects((prev) => [newProject, ...prev]);

      return newProject; // 🔥 WAJIB RETURN
    } finally {
      setSubmitting(false);
    }
  }

  /* ======================
      UPDATE PROJECT
  ====================== */
  async function updateProjectById(id, payload) {
    setSubmitting(true);

    try {
      const updated = await updateProject(id, payload);

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ======================
      DELETE PROJECT
      (images auto deleted via cascade db)
  ====================== */
  async function removeProject(project) {
  setSubmitting(true);

  try {

    // HAPUS SEMUA IMAGE DI STORAGE
    if (project.images?.length) {
      const paths = project.images.map(i => i.image_path);
      await deleteMultipleProjectImages(paths);
    }

    // HAPUS DB ROW
    await deleteProject(project.id);

    setProjects(prev =>
      prev.filter(p => p.id !== project.id)
    );

  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    alert(err.message || "Delete failed");
  } finally {
    setSubmitting(false);
  }
}


  return {
    projects,
    loading,
    submitting,
    addProject,
    updateProject: updateProjectById,
    removeProject,
  };
}
