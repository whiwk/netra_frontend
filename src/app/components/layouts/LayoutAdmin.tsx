import React, { ReactNode } from 'react';
import NavbarAdmin from '../NavbarAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      <NavbarAdmin />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
