"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/dashboard.service";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await getDashboardData();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading };
}
