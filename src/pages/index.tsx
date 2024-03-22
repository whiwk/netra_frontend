import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../app/utils/isAuth';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const authStatus = isAuthenticated();

    if (authStatus.isAuthenticated) {
      // Assuming you want to redirect based on roles
      if (authStatus.isSuperuser) {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/intro');
      }
    } else {
      router.replace('/auth/login');
    }
  }, [router]);

  return null;
};

export default HomePage;
