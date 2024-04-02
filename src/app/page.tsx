"use client";
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  is_superuser?: boolean;
  is_staff?: boolean;
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        router.replace('/auth/login');
      } else {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);

          if (decoded.is_superuser) {
            router.replace('/admin/dashboard');
          } else {
            router.replace('/intro');
          }
        } catch (error) {
          console.error('Error decoding authToken:', error);
          router.replace('/auth/login');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <Head>
        <title>Open Netra</title>
      </Head>
    </>
  );
}
