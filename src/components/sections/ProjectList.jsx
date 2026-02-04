export default function ProjectList({
  projects,
  onDelete,
}) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No projects yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {projects.map((p) => (
        <li
          key={p.id}
          className="border p-4 rounded flex gap-4"
        >
          {p.image_url && (
            <img
              src={p.image_url}
              className="w-24 h-24 object-cover rounded"
            />
          )}

          <div className="flex-1">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-500">{p.type}</p>
            <p className="text-sm">{p.description}</p>
          </div>

          <button
            onClick={() => onDelete(p.id)}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
