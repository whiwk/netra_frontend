import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const LoginPageHideShowPassword = dynamic(() => import('../../app/components/LoginPageHideShowPassword'), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Open Netra | Login</title>
      </Head>
      <LoginPageHideShowPassword />
    </>
  );
};

export default LoginPage;
