"use client";
import React, { useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout'
import useRequireAuth from '@/hooks/requireAuth'
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const AdminMonitoring = () => {
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
    <AdminLayout>
      <div style={{ marginTop: '-580px' }}>
        AdminMonitoring
      </div>
    </AdminLayout>
  )
}

export default function AdminMonitoringWithAuth() {
  return (
    <AuthProvider>
      <AdminMonitoring />
    </AuthProvider>
  );
}