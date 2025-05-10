"use client";

import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/navigation";
// import { HiCheckCircle } from "react-icons/hi";

const page = () => {
  const {user} = useAuth();

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      {/* Greeting */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-indigo-100 rounded-full">
          {/* <HiCheckCircle className="w-8 h-8 text-indigo-600" /> */}
        </div>
        <div>
          <p variant="h6" className="text-slate-700">
            Selamat datang,
          </p>
          <p variant="paragraph" className="text-slate-500">
            <span className="font-semibold">{user?.name}</span>
          </p>
        </div>
      </div>

      {/* User Detail Card */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <p variant="h6" className="text-slate-700 mb-4">
          Informasi Pengguna
        </p>
        <div className="space-y-2 text-slate-600">
          <p>
            <span className="font-semibold text-slate-500">Role:</span>{" "}
            {user?.role}
          </p>
          <p>
            <span className="font-semibold text-slate-500">Email:</span>{" "}
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
