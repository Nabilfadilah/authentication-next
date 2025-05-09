import axios from "axios";

// membuat instance axios dengan base URL dari env
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// interceptor untuk menambahkan token ke header setiap request secara otomatis
api.interceptors.request.use((config) => {
    // mengecek apakah code dijalankan di browser 
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    // jika ada token, tambah ke header Authorization
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // kembalikan config yang sudah dimodifikasi
});

export default api;