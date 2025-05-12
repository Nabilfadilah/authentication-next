"use client";

import {useAuth} from "../../context/AuthContext";
import BiodataView from "./view/page";
import BiodataList from "./list/page";

// komponen yang merender tampilan berdasarkan role user
const BiodataRouterPage = () => {
  const {user} = useAuth(); // mengambil data user

  if (!user) {
    return <p>Loading user info...</p>; // jika user belum tersedia (mungkin masih fetching)
  }

  // jika user adalah admin, tampilkan daftar semua biodata
  if (user.role === "admin") {
    return <BiodataList />;
  }
  // jika user adalah user biasa, tampilkan tampilan biodata pribadi
  else if (user.role === "user") {
    return <BiodataView />;
  }
  // jika role tidak dikenali, tampilkan pesan error
  else {
    return <p>Role tidak dikenali atau tidak memiliki akses.</p>;
  }
};

export default BiodataRouterPage;
