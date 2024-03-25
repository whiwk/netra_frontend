import UserLayout from '../app/components/layouts/LayoutUser';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CardWithImageAndActions = dynamic(() => import('../app/components/Intro'), {
  ssr: false,
});

const IntroPage = () => {
  return (
    <UserLayout>
      <Head>
        <title>Open Netra | Intro</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <CardWithImageAndActions />;
      </div>
    </UserLayout>
  );
};

export default IntroPage;
