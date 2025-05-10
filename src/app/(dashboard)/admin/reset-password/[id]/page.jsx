"use client";

import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import api from "../../../../lib/api";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {BiArrowBack} from "react-icons/bi";
import Link from "next/link";

const ResetPasswordForm = () => {
  const params = useParams(); // ambil id user dari URL
  const router = useRouter();
  const id = params.id;

  const [newPassword, setNewPassword] = useState(""); // password baru
  const [confirmPassword, setConfirmPassword] = useState(""); // konfirmasi password
  const [message, setMessage] = useState(""); // notifikasi sukses/gagal
  const [showNewPassword, setShowNewPassword] = useState(false); // toggle show/hide password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // fungsi untuk reset password
  const handleReset = async (e) => {
    e.preventDefault();

    // validasi: pastikan password dan konfirmasinya cocok
    if (newPassword !== confirmPassword) {
      return setMessage("Password dan konfirmasi tidak cocok");
    }

    try {
      // mengirim permintaan PUT untuk reset password user berdasarkan ID
      await api.put(`/admin/reset-password/${id}`, {newPassword});
      setMessage("Password berhasil di-reset");

      setTimeout(() => router.push("/users"), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Gagal mereset password user"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Reset Password User</h1>
        <Link href="/users" className="flex items-center gap-2 text-blue-600">
          <BiArrowBack />
          Back
        </Link>
      </div>

      {/* menampilkan pesan sukses atau error jika ada */}
      {message && (
        <p
          className={`mb-4 text-sm font-semibold ${
            message.includes("berhasil") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleReset}>
        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Password Baru</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
          {/* Icon mata / mata tertutup untuk toggle visibility */}
          {/* Posisi absolut agar icon berada di dalam input, sisi kanan */}
          <div
            className="absolute top-9 right-3 text-gray-600 cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Konfirmasi Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
          <div
            className="absolute top-9 right-3 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {/* tampilkan icon sesuai state showConfirmPassword */}
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
