import UserLayout from '../app/components/layouts/LayoutUser';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const UserMonitoringPage = () => {
  return (
    <UserLayout>
      <Head>
        <title>Open Netra | Monitoring</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <h1>User Monitoring</h1>
      </div>
    </UserLayout>
  );
};

export default UserMonitoringPage;
