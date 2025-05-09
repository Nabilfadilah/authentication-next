"use client"; // direktif, file ini hanya dijalankan di sisi client

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

// buat context autentikasi
const AuthContext = createContext();

// provider untuk membungkus komponen agar bisa mengakses context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // state menyimpan user yang login 
  const [token, setToken] = useState(null);     // state menyimpan token
  const [loading, setLoading] = useState(true); // state untuk loading

   // saat pertama kali komponen dimount (load), ambil token dan user dari localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // ubah dari string ke objek
    }
    setLoading(false); // selesaikan loading
  }, []);

  // fungsi login, mengirim email dan password ke API
  const login = async ({ email, password }) => {
    const res = await api.post("/login", { email, password }); // kirim POST ke endpoint login
    const { token, user } = res.data;

    // simpan token dan user ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // simpan ke state
    setToken(token);
    setUser(user);
  };

  // fungsi logout, hapus semua data autentikasi
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // kirim value context ke semua komponen anak
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook, gar lebih mudah mengakses context
export const useAuth = () => useContext(AuthContext);
