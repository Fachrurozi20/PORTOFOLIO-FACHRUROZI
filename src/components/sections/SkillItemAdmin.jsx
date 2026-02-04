"use client";

export default function SkillItemAdmin({
  skill,
  onDelete,
}) {
  return (
    <li className="border p-3 rounded flex justify-between items-center">

      <div>
        <p className="font-semibold">{skill.name}</p>
        <p className="text-sm text-gray-500">
          {skill.level}
        </p>
      </div>

      <button
        onClick={() => onDelete(skill)}
        className="text-red-600 text-sm"
      >
        Delete
      </button>

    </li>
  );
}
