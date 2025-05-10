"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "../context/AuthContext";

// komponen untuk melindungi route dari user yang belum login
export default function ProtectedRoute({children}) {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    // jika sudah tidak loading dan user belom login, arahkan ke /login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // tampilkan loading jika masih memuat atau user belum siap
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  // jika user valid, tampilkan konten anak
  return children;
}
