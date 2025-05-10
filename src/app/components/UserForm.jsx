import Link from "next/link";
import {useState} from "react";
import {BiArrowBack} from "react-icons/bi";

export default function UserForm({user, onSubmit}) {
  // inisialisasi state form dengan data user
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
  });

  // funngsi untuk handle perubahan input
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold">Edit User</p>

        <button className="bg-black hover:bg-gray-800 text-white p-1 rounded">
          <Link href={"/users"} className="flex items-center gap-2">
            <BiArrowBack />
            Back
          </Link>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
