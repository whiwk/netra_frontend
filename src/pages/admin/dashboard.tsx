import AdminLayout from '../../app/components/layouts/LayoutAdmin';
import Head from 'next/head';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Open Netra | Dashboard</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <h1>Admin Dashboard</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
