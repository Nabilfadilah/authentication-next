"use client";

import {useState} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// layout utama yang membungkus halaman dashboard
export default function MainLayout({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state untuk sidebar

  // fungsi toggle untuk membuka /menutup sidebar
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen relative">
      {/* sidebar dengan prop untuk kontrol buka/tutup */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* bagian utama layout */}
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 mt-16 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
