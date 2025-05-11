"use client";

import {useAuth} from "@/app/context/AuthContext";
import api from "@/app/lib/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {FaEdit, FaTrash, FaRedo} from "react-icons/fa";

const UserList = () => {
  const {user} = useAuth(); // ambil data user yg login
  const [userAll, setUserAll] = useState([]); // state menyimpan seluruh data user dari backend
  const router = useRouter();

  useEffect(() => {
    // jalankan fetchUsers hanya jika role user adalah admin
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, []); // array agar tidak fetch berulang

  // fungsi untuk mengambil seluruh user dari backend
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUserAll(res.data.users); // simpan data user ke state
    } catch (err) {
      console.log("Gagal mengambil data user:", err);
    }
  };

  // fungsi navigasi ke edit user berdasarkan id
  const handleEdit = (id) => {
    // router.push(`/user/${id}/edit`);
    router.push(`/users/${id}/edit`);
    // router.push(`/dashboard/users/${id}/edit`);
  };

  // fungsi untuk hapus user berdasarkan id
  const handleDelete = async (id) => {
    // konfirmasi sebelum menghapus user
    const confirmDelete = window.confirm("Yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/user/${id}`); // hapus user dari backend
      alert("User berhasil dihapus");
      fetchUsers(); // refresh daftar user
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      alert("Gagal menghapus user");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Daftar User Register</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 border text-start">No.</th>
              <th className="py-2 px-4 border text-start">Nama</th>
              <th className="py-2 px-4 border text-start">Email</th>
              <th className="py-2 px-4 border text-start">Role</th>
              <th className="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {/* mapping user */}
            {userAll.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 border w-11 text-center">
                  {index + 1}.
                </td>
                <td className="py-2 px-4 border font-semibold text-start">
                  {user.name}
                </td>
                <td className="py-2 px-4 border text-gray-600 text-start">
                  {user.email}
                </td>
                <td className="py-2 px-4 border text-gray-500 italic text-start">
                  {user.role}
                </td>
                <td className="py-2 px-4 border flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <FaTrash /> Delete
                  </button>

                  <button className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer">
                    <Link
                      href={`/admin/reset-password/${user.id}`}
                      className="flex items-center gap-2"
                    >
                      <FaRedo /> Reset
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
