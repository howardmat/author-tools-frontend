import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const CharacterRootPage: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  console.log('test', userId);

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return 'Loading...';

  return <Outlet />;
};

export default CharacterRootPage;
