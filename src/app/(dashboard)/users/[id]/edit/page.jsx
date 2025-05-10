"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import api from "../../../../lib/api";
import UserForm from "../../../../components/UserForm";

export default function EditUser() {
  const router = useRouter();
  const params = useParams(); // mengambil id user dari url
  const {id} = params;

  const [user, setUser] = useState(null); // data user yang akan diedit
  const [loading, setLoading] = useState(true); // indikator loading saat ambil data

  useEffect(() => {
    if (!id) return;

    // ambil data user dari backend berdasarkan id
    const fetchUser = async () => {
      try {
        // melakukan request GET ke endpoint API untuk mengambil data user
        const res = await api.get(`/users/${id}`);
        setUser(res.data); // simpan ke state
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Gagal mengambil data user");
        router.push("/dashboard/users");
      } finally {
        setLoading(false);
      }
    };

    // memanggil fungsi fetchUser saat ID user berubah
    fetchUser();
  }, [id]); // dependency array memastikan data diambil setiap kali ID berubah

  // kirim data form ke backend untuk update
  const handleSubmit = async (formData) => {
    try {
      // kirim request update ke server
      await api.put(`/user/${id}/edit`, formData);
      alert("User berhasil diupdate");
      router.push("/users");
    } catch (err) {
      console.error(err);
      alert("Gagal update user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User tidak ditemukan</p>;

  return (
    <div>
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
}
