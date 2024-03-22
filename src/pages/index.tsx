import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  is_superuser?: boolean;
  is_staff?: boolean;
}


const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      router.replace('/auth/login');
    } else {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const { is_staff, is_superuser } = decoded;
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
  }, [router]);

  return null;
};

export default HomePage;
