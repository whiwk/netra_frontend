import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      
      // If there's no authToken, redirect to the login page
      if (!authToken) {
        router.push('/auth/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
