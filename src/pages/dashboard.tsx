import UserLayout from '../app/components/layouts/LayoutUser';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const UserDashboardPage = () => {
  return (
    <UserLayout>
      <Head>
        <title>Open Netra | Dashboard</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <h1>User Dashboard</h1>
      </div>
    </UserLayout>
  );
};

export default UserDashboardPage;
