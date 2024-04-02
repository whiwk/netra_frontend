"use client";
import React, { useEffect } from 'react';
import UserLayout from '@/layouts/UserLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const Intro = () => {
  const { isLoading } = useRequireAuth();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Open Netra | Intro';
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
        Intro
      </div>
    </UserLayout>
  );
};

export default function IntroWithAuth() {
  return (
    <AuthProvider>
      <Intro />
    </AuthProvider>
  );
}
