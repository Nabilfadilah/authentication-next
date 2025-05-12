"use client";
import {useEffect, useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import Link from "next/link";
import {FaEdit} from "react-icons/fa";
import api from "@/app/lib/api";

const BiodataView = () => {
  const {user} = useAuth(); // ambil data user yg login
  const [biodata, setBiodata] = useState(null); // state untuk menyimppan biodata user

  useEffect(() => {
    // fungsi untuk mengambil biodata dari backend
    const fetchMyBiodata = async () => {
      try {
        const res = await api.get("/biodata"); // mengambil data dari endpoint
        setBiodata(res.data); // menyimpan data ke state
      } catch (err) {
        setBiodata(null); // jika gagal, set biodata ke null
      }
    };
    fetchMyBiodata(); // memanggil fungsi pengambilan data saat komponen dimount
  }, [user]); // akan dijalankan ulang jika data user berubah

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h1 className="text-xl font-bold">Biodata Saya</h1>
      </div>

      {/* menampilkan biodata jika tersedia */}
      {biodata ? (
        <div className="flex flex-col items-center text-center">
          <img
            src={biodata.photo}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-sm mb-4"
          />
          <h2 className="text-xl font-semibold">{biodata.name}</h2>
          <p className="text-gray-600">📧 {biodata.email}</p>
          <p className="text-gray-600">🏠 {biodata.address}</p>
          <p className="text-gray-600 mb-4">📞 {biodata.phone}</p>
          <Link
            href={`/biodata/edit/${biodata.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaEdit /> Edit
          </Link>
        </div>
      ) : (
        // jika biodata belum tersedia
        <div className="text-center">
          <p className="text-gray-500 pb-5">*Biodata belum tersedia.</p>
          <Link
            href="/biodata/create"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Buat Biodata
          </Link>
        </div>
      )}
    </div>
  );
};

export default BiodataView;
