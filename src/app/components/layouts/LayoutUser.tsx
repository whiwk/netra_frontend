import React, { ReactNode } from 'react';
import NavbarUser from '../NavbarUser';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
      <NavbarUser />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
