import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRequireAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      router.replace('/auth/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading };
};
export default useRequireAuth;  
