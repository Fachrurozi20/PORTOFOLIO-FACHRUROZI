"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SidebarAdmin from "@/components/layout/sidebaradmin";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/admin_login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="flex-1">{children}</main>
    </div>
  );
}
