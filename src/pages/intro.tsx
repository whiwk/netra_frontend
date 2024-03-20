import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the login page component for client-side rendering
const NavHorizontal = dynamic(() => import('../app/components/NavHorizontal'), {
  ssr: false,
});

const IntroPage = () => {
  return (
    <div>
      <NavHorizontal />
      <main>
        {/* Content of your intro page */}
        <h1>Welcome to the Intro Page</h1>
      </main>
    </div>
  );
};

export default IntroPage;
