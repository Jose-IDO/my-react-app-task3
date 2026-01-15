import React from 'react';
import { Text } from './Text/Text';
import { Whitebox } from './Whitebox/Whitebox';
import { Buttons } from './button/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated 
}) => {
  if (!isAuthenticated) {
    return (
      <div style={{ marginTop: '120px' }}>
        <Whitebox modcolor="modcolorone">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text variant="h1" style={{ marginBottom: '20px' }}>
              Authentication Required
            </Text>
            <Text variant="p" style={{ marginBottom: '30px', fontSize: '18px' }}>
              Please log in to access this page.
            </Text>
            <Buttons onClick={() => window.location.href = '/login'}>
              Go to Login
            </Buttons>
          </div>
        </Whitebox>
      </div>
    );
  }

  return <>{children}</>;
};