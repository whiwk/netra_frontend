import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the login page component for client-side rendering
const LoginPageHideShowPassword = dynamic(() => import('../../app/components/LoginPageHideShowPassword'), {
  ssr: false,
});

const LoginPage = () => {
  return <LoginPageHideShowPassword />;
};

export default LoginPage;
