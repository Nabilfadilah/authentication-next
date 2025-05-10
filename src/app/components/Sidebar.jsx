"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {BiHomeAlt, BiLogOut} from "react-icons/bi";
import {FaUserGear} from "react-icons/fa6";
import {AiOutlineProfile} from "react-icons/ai";
import {useAuth} from "../context/AuthContext";

// sidebar navigasi utama, menyesuaikan role user
export default function Sidebar({isOpen, onClose}) {
  const router = useRouter();
  const pathname = usePathname(); // ini untuk path aktif
  const {user, logout} = useAuth();

  const handleLogout = async () => {
    await logout(); // proses logout dari context
    router.push("/login");
  };

  const role = user?.role; // mendapatkan peran user (admin/user)

  // navigasi berdasarkan role
  const navItems = [
    {name: "Dashboard", path: "/dashboard", icon: <BiHomeAlt />},
  ];

  // mengecek role user untuk menentukan menu tambahan yang akan ditampilkan di sidebar.
  // jika user memiliki role "admin", maka akan diberikan akses ke dua menu tambahan
  if (role === "admin") {
    navItems.push({name: "User List", path: "/users", icon: <FaUserGear />});
    navItems.push({
      name: "Biodata List",
      path: "/biodata",
      icon: <AiOutlineProfile />,
    });

    // jika role-nya adalah "user" biasa, maka hanya diberikan akses ke 1 menu:
  } else if (role === "user") {
    navItems.push({
      name: "Biodata",
      path: "/biodata",
      icon: <AiOutlineProfile />,
    });
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex transition-transform duration-300 ${
        isOpen ? "" : "hidden"
      } md:static md:inset-auto md:translate-x-0 md:flex`}
    >
      {/* overlay hitam untuk mode mobile */}
      <div
        className="fixed inset-0 bg-black opacity-50 md:hidden"
        onClick={onClose}
      ></div>

      {/* kontainer sidebar */}
      <div className="w-64 bg-gray-900 text-white z-50 h-full flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Dashboard Panel
        </div>

        {/* menu navigasi */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 py-2 px-4 rounded transition-colors duration-200 ${
                  isActive ? "bg-gray-800 font-semibold" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* tombol logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 px-4 py-2 rounded cursor-pointer"
          >
            <BiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
