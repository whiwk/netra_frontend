"use client";
import React, { useEffect } from 'react';
import useRequireAuth from '@/hooks/requireAuth'

const Logout = () => {
  const { isLoading } = useRequireAuth();

  useEffect(() => {
    document.title = 'Open Netra | Logout';
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <div>Logout</div>
  )
}

export default Logout