import '@patternfly/patternfly/patternfly.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  LoginForm,
  LoginPage,
  ListVariant
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';

export const LoginComponents: React.FunctionComponent = () => {
  const router = useRouter();
  const [showHelperText, setShowHelperText] = useState(false);
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [error, setError] = useState('');

  const handleUsernameChange = (_event: React.FormEvent<HTMLInputElement>, value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (_event: React.FormEvent<HTMLInputElement>, value: string) => {
    setPassword(value);
  };

  const isErrorWithResponse = (error: any): error is { response: { data: { message: string } } } => {
    return error.response && error.response.data && typeof error.response.data.message === 'string';
  };

  const onLoginButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsValidUsername(!!username);
    setIsValidPassword(!!password);
  
    // Only proceed if username and password are not empty
    if (username && password) {
      try {
        const response = await axios.post('http://10.30.1.221/api/v1/token/access/', {
          username,
          password
        });
        
        // Assuming the API returns a token and stores it in local storage
        localStorage.setItem('authToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        router.push('/');
  
      } catch (error) {
        setShowHelperText(true);
        let errorMessage = 'An error occurred during login';
        
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || 'An error occurred during login';
        }
        
        setError(errorMessage);
      }
    } else {
      setShowHelperText(true);
    }
  };

  const loginForm = (
    <LoginForm
      showHelperText={showHelperText}
      helperText="Invalid login credentials."
      helperTextIcon={<ExclamationCircleIcon />}
      usernameLabel="Username"
      usernameValue={username}
      onChangeUsername={handleUsernameChange}
      isValidUsername={isValidUsername}
      passwordLabel="Password"
      passwordValue={password}
      isShowPasswordEnabled
      onChangePassword={handlePasswordChange}
      isValidPassword={isValidPassword}
      onLoginButtonClick={onLoginButtonClick}
      loginButtonLabel="Log in"
    />
  );


  return (
    <LoginPage
      footerListVariants={ListVariant.inline}
      brandImgSrc='/netra_logo.png'
      backgroundImgSrc="/assets/images/pfbg-icon.svg"
      textContent="5G Network Simulation System Based on Centralized Dashboard in Cloud Native Environment for Managed Telecom Laboratory"
      loginTitle="Log in to your account"
    >
      {loginForm}
    </LoginPage>
  );
};
export default LoginComponents;