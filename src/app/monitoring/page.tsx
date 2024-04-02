"use client";
import React, { useEffect } from 'react';
import UserLayout from '@/layouts/UserLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const UserMonitoring = () => {
  const { isLoading } = useRequireAuth();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Open Netra | Monitoring';
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
        UserMonitoring
      </div>
    </UserLayout>
  )
}

export default function UserMonitoringWithAuth() {
  return (
    <AuthProvider>
      <UserMonitoring />
    </AuthProvider>
  );
}