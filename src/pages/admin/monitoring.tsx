import AdminLayout from '../../app/components/layouts/LayoutAdmin';
import Head from 'next/head';

const AdminMonitoringPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Open Netra | Monitoring</title>
      </Head>
      <div style={{ marginTop: '-580px' }}>
        <h1>Admin Monitoring</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminMonitoringPage;
