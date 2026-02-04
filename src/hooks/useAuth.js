import { useEffect, useState } from "react";
import { getSession, signOut } from "@/services/auth.service";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  return {
    session,
    loading,
    isAuthenticated: !!session,
    logout: signOut,
  };
}
