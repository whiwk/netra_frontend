// utils/auth.js
export const isAuthenticated = () => {
    // Check if the auth token exists in localStorage
    return Boolean(localStorage.getItem('authToken'));
  };
  