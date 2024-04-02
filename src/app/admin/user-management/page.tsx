"use client";
import React, { useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const UserManagement = () => {
  const { isLoading } = useRequireAuth();
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = 'Open Netra | User Management';
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
        UserManagement
      </div>
    </AdminLayout>
  );
};

export default function UserManagementWithAuth() {
  return (
    <AuthProvider>
      <UserManagement />
    </AuthProvider>
  );
}
