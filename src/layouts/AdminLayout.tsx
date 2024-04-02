import React, { ReactNode } from 'react';
import NavbarAdmin from '@/components/NavbarAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div>
    <NavbarAdmin/>
    <main>{children}</main>
  </div>
);

export default AdminLayout;
