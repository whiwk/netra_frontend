export const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  const isStaff = localStorage.getItem('isStaff') === 'true';
  const isSuperuser = localStorage.getItem('isSuperuser') === 'true';

  const isAuthenticated = Boolean(authToken);
  
  return { isAuthenticated, isStaff, isSuperuser };
};