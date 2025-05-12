"use client";

import {useEffect, useState} from "react";
import api from "@/app/lib/api";
import {useAuth} from "@/app/context/AuthContext";

const BiodataList = () => {
  const {user} = useAuth(); // ambil data user yg login
  const [biodataList, setBiodataList] = useState([]); // state menyimpan seluruh data user dari backend

  useEffect(() => {
    // fungsi untuk mengambil seluruh biodata dari backend
    const fetchAll = async () => {
      try {
        const res = await api.get("/biodata"); // mengambil data dari endpoint
        setBiodataList(res.data); // simpan data biodata ke state
      } catch (error) {
        console.error("Gagal mengambil data biodata:", error);
        setBiodataList([]); // jika gagal, set data ke array kosong
      }
    };
    fetchAll(); // memanggil fungsi pengambilan data saat komponen dimount
  }, [user]); // akan dijalankan ulang jika data user berubah

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">List Biodata Semua User</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">No.</th>
              <th className="py-2 px-4 border text-start">Nama</th>
              <th className="py-2 px-4 border text-start">Email</th>
              <th className="py-2 px-4 border text-start">No Telepon</th>
              <th className="py-2 px-4 border text-start">Alamat</th>
              <th className="py-2 px-4 border">Foto</th>
            </tr>
          </thead>
          <tbody>
            {/* mapping biodata */}
            {biodataList.map((b, index) => (
              <tr key={b.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 border w-11 text-center">
                  {index + 1}.
                </td>
                <td className="py-2 px-4 border">{b.name}</td>
                <td className="py-2 px-4 border">{b.email}</td>
                <td className="py-2 px-4 border">{b.phone}</td>
                <td className="py-2 px-4 border">{b.address}</td>
                <td className="py-2 px-4 border text-center">
                  <img
                    src={b.photo || "https://via.placeholder.com/50"}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiodataList;
