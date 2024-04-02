import React, { ReactNode } from 'react';
import NavbarUser from '@/components/NavbarUser';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => (
  <div>
    <NavbarUser/>
    <main>{children}</main>
  </div>
);

export default UserLayout;
