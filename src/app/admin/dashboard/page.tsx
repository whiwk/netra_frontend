"use client";
import React, { useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { isLoading } = useRequireAuth();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Open Netra | Dashboard';
  }, []);

  if (isLoading) {
    return null; 
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <div style={{ marginTop: '-580px' }}>
        AdminDashboard
      </div>
    </AdminLayout>
  )
}

export default function AdminDashboardWithAuth() {
  return (
    <AuthProvider>
      <AdminDashboard />
    </AuthProvider>
  );
}