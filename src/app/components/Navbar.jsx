"use client";

import {useState} from "react";
import Link from "next/link";

// navbar responsif untuk menampilkan tombol toggle sidebar di mobile
export default function Navbar({onToggleSidebar}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // state untuk toggle menu di mode mobile

  // daftar menu navigasi
  const navItems = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "User List", path: "/users"},
    {name: "Biodata List", path: "/biodata"},
  ];

  return (
    <header className="bg-white p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* tombol toggle sidebar di mobile */}
      <button className="md:hidden text-2xl" onClick={onToggleSidebar}>
        ☰
      </button>

      {/* menu dropdown khusus mobile */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md p-4 rounded-md z-50 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block py-2 px-4 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
