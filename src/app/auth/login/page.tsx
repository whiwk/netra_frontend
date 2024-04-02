"use client";
import React, { useEffect } from 'react';
import LoginComponents from '@/components/LoginComponents';

const Login = () => {
  useEffect(() => {
    document.title = 'Open Netra | Login';
  }, []);

  return (
    <LoginComponents/>
  )
}

export default Login