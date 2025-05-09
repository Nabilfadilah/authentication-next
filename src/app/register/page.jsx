"use client";

import {useState} from "react";
import api from "../lib/api";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Register() {
  // state form input
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // role default
  });
  const router = useRouter(); // navigasi ke halaman lain
  const [message, setMessage] = useState(""); // state untuk menyimpan pesan status pendaftaran (sukses/gagal)

  // fungsi ketika form register dikirim
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman

    try {
      // kirim data ke API endpoint register
      await api.post("/register", form);
      setMessage("Berhasil daftar, silahkan login");

      // tunggu 2.5 detik lalu pindah ke halaman login
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      // tampilkan pesan error dari API jika ada
      setMessage(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        {/* form register */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <input
            placeholder="Nama"
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* email */}
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* password */}
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* tautan ke halaman login */}
          <div className="text-sm text-gray-500">
            Kamu sudah memiliki akun,{" "}
            <Link href="/login" className="text-blue-500 hover:underline ">
              <b>Login</b>
            </Link>
          </div>

          {/* button register */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* tampilkan pesan status */}
        {message && <p className="text-green-600 pt-3">{message}</p>}
      </div>
    </div>
  );
}
