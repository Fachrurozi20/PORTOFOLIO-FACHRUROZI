"use client";

export default function ProjectItemAdmin({
  project,
  onEdit,
  onDelete,
  submitting,
}) {
  return (
    <li className="border rounded-xl p-4 space-y-3 bg-black/40 glow">

      <h3 className="text-lg font-semibold">
        {project.title}
      </h3>

      <p className="text-sm text-gray-400">
        {project.description}
      </p>

      <p className="text-xs text-gray-500">
        {project.type}
      </p>

      <div className="flex gap-3 pt-2">

        <button
          onClick={() =>
            onEdit(project, {
              title: project.title,
              description: project.description,
              type: project.type,
              github_url: project.github_url,
            })
          }
          disabled={submitting}
          className="px-4 py-1 rounded bg-yellow-500 text-black text-sm hover:opacity-80"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project)}
          disabled={submitting}
          className="px-4 py-1 rounded bg-red-600 text-white text-sm hover:opacity-80"
        >
          Delete
        </button>

      </div>
    </li>
  );
}
