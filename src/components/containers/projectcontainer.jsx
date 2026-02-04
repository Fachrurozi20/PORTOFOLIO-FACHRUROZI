"use client";

import ProjectForm from "@/components/sections/ProjectForm";
import ProjectItemAdmin from "@/components/sections/ProjectItemAdmin";

import {
  uploadMultipleProjectImages,
  deleteMultipleProjectImages,
} from "@/services/storage.service";

import { addProjectImages } from "@/services/projectImage.service";

import { useProjects } from "@/hooks/useProjects";

export default function ProjectContainer() {
  const {
    projects,
    loading,
    submitting,
    addProject,
    editProject,
    removeProject,
  } = useProjects();

  /* ============================
      CREATE PROJECT + MULTI IMAGE
  ============================ */
  async function handleCreate(form, imageFiles) {
    // 1. create project row
    const project = await addProject(form);

    // 2. upload images to storage
    if (imageFiles?.length) {
      const paths = await uploadMultipleProjectImages(imageFiles);

      // 3. save paths to project_images table
      await addProjectImages(project.id, paths);
    }
  }

  /* ============================
      EDIT PROJECT (TEXT ONLY)
      (gallery edit kita upgrade nanti)
  ============================ */
  async function handleEdit(project, form) {
    await editProject(project.id, form);
  }

  /* ============================
      DELETE PROJECT + ALL IMAGES
  ============================ */
  async function handleDelete(project) {
    try {

      // hapus semua image storage dulu
      if (project.images?.length) {
        const paths = project.images.map(i => i.image_path);
        await deleteMultipleProjectImages(paths);
      }

      // hapus row project
      await removeProject(project);

    } catch (err) {
      console.error("DELETE PROJECT ERROR:", err);
      alert(err.message || "Delete failed");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      {/* CREATE FORM */}
      <ProjectForm
        onSubmit={handleCreate}
        submitting={submitting}
      />

      {/* PROJECT LIST */}
      <ul className="space-y-4">
  {projects.map((p) => (
    <ProjectItemAdmin
      key={p.id}
      project={p}
      submitting={submitting}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ))}
</ul>

    </div>
  );
}
