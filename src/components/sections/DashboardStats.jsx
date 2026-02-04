import { getPhotoUrl } from "@/services/profileStorage.service";


export default function DashboardStats({ data }) {
  const { profile, totalProjects, totalSkills, contact } =
    data;

  const photoUrl = profile.photo_path
    ? getPhotoUrl(profile.photo_path)
    : "";

  return (
    <div className="p-6 space-y-6">

      {/* PROFILE */}
      <div className="flex items-center gap-4 border p-4 rounded">
        {photoUrl && (
          <img
            src={photoUrl}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}

        <div>
          <h2 className="text-xl font-bold">
            {profile.full_name}
          </h2>
          <p className="text-gray-500">
            {profile.headline}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">

        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">
            Projects
          </p>
          <p className="text-2xl font-bold">
            {totalProjects}
          </p>
        </div>

        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">
            Skills
          </p>
          <p className="text-2xl font-bold">
            {totalSkills}
          </p>
        </div>

        <div className="border p-4 rounded col-span-2">
          <p className="text-sm text-gray-500">
            Contact Email
          </p>
          <p className="font-semibold">
            {contact.email}
          </p>
        </div>

      </div>
    </div>
  );
}
