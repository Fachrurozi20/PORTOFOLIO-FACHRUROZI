import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Dashboard", href: "/dashboardadmin" },
  { name: "Profiles", href: "/dashboardadmin/profiles" },
  { name: "Projects", href: "/dashboardadmin/projects" },
  { name: "Skills", href: "/dashboardadmin/skills" },
  { name: "Contact", href: "/dashboardadmin/contact" },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block px-3 py-2 rounded text-sm
              ${pathname === menu.href
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"}
            `}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
