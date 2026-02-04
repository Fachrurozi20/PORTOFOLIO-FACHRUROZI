"use client";

import { useDashboard } from "@/hooks/useDashboard";
import DashboardStats from "@/components/sections/DashboardStats";

export default function AdminDashboardContainer() {
  const { data, loading } = useDashboard();

  if (loading) return <p className="p-6">Loading...</p>;

  return <DashboardStats data={data} />;
}
