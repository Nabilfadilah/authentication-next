'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// layout khusus dashboard yang dibungkus dengan proteksi login
export default function DashboardLayout({ children }) {
  return (
        <ProtectedRoute>
            <MainLayout>{children}</MainLayout>
        </ProtectedRoute>
    );
}
