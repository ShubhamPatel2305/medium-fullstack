import React, { useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../hooks';

const NavbarContainer: React.FC = () => {
  const { isLoggedIn, username, checkAuthStatus } = useAuth();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Check auth status when component mounts
    checkAuthStatus();
  }, [checkAuthStatus, isLoggedIn]);

  return (
    <Navbar
      isLoggedIn={isLoggedIn}
      username={username}
      onLogout={handleLogout}
    />
  );
};

export default NavbarContainer;