"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "../../../context/AuthContext"; // asumsi kamu punya context
import Link from "next/link";
import api from "@/app/lib/api";

const CreateBiodata = () => {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState(null); // state untuk preview foto

  // state untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: null, // akan bentuk file
  });

  // fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const {name, value, type, files} = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({...formData, photo: file}); // simpan file foto ke state formData
        setPhotoPreview(URL.createObjectURL(file)); // menampilkan preview foto
      }
    } else {
      setFormData({...formData, [name]: value}); // menyimpan input teks ke state
    }
  };

  // fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman

    const data = new FormData(); // membuat objek FormData untuk dikirim ke backend

    // tambahkan setiap field (kecuali foto) ke FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "photo") data.append(key, value); // menambahkan data selain foto
    });

    // validasi: pastikan foto adalah file yang valid
    if (!(formData.photo instanceof File)) {
      alert("Foto harus berupa file yang valid!");
      return;
    }

    data.append("photo", formData.photo); // menambahkan file foto ke FormData

    try {
      // kirim data ke endpoint backend dengan tipe multipart/form-data
      await api.post("/biodata/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Biodata berhasil dibuat!"); // beri notifikasi sukses
      router.push("/biodata"); // arahkan kembali ke halaman biodata list
    } catch (err) {
      console.error("Gagal membuat biodata:", err); // tampilkan error di console
      alert("Terjadi kesalahan saat mengirim data."); // beri notifikasi error
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Form Biodata</p>
        <button>
          <Link
            href="/biodata"
            className="flex items-center gap-2 text-blue-600"
          >
            Kembali
          </Link>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* input Nama */}
        <div>
          <label className="block text-sm font-medium">Nama</label>
          <input
            label="Nama"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {/* input Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {/* input No Telepon */}
        <div>
          <label className="block text-sm font-medium">No Telepon</label>
          <input
            label="No Telepon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {/* input alamat */}
        <div>
          <label className="block text-sm font-medium">Alamat</label>
          <input
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-full object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-green-500 hover:bg-green-600 py-2 cursor-pointer"
        >
          Simpan Biodata
        </button>
      </form>
    </div>
  );
};

export default CreateBiodata;
