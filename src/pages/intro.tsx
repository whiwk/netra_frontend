// pages/intro.tsx or under your specific path structure

import React from 'react';
import { NavHorizontal } from '../app/components/NavHorizontal'; // Adjust the import path based on your file structure

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
