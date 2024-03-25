import AdminLayout from '../../app/components/layouts/LayoutAdmin';
import Head from 'next/head';

const UserManagementPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Open Netra | User Management</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <h1>User Management</h1>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
