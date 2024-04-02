"use client";
import React, { useEffect } from 'react';
import UserLayout from '@/layouts/UserLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
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
    <UserLayout>
      <div style={{ marginTop: '-580px' }}>
        User Dashboard
      </div>
    </UserLayout>
  )
}

export default function UserDashboardWithAuth() {
  return (
    <AuthProvider>
      <UserDashboard />
    </AuthProvider>
  );
}