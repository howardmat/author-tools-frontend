import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LoadingIndicator from '@/components/loading-indicator';

const CharacterRootPage: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return <LoadingIndicator />;

  return <Outlet />;
};

export default CharacterRootPage;
