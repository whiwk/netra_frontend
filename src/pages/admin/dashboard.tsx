import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the login page component for client-side rendering
const NavbarUser = dynamic(() => import('../../app/components/NavbarUser'), {
  ssr: false,
});

const IntroPage = () => {
  return (
    <div>
      <NavbarUser />
      <main>
        {/* Content of your intro page */}
        <h1>Welcome to the dashboard</h1>
      </main>
    </div>
  );
};

export default IntroPage;
