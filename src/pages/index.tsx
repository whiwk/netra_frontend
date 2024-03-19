// pages/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../app/utils/auth'; // Adjust the import path based on your file structure

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to the dashboard if the user is authenticated
      router.replace('/dashboard');
    } else {
      // Redirect to the login page if the user is not authenticated
      router.replace('/login');
    }
  }, [router]);

  return null; // Render nothing while the redirection is being determined
};

export default HomePage;
