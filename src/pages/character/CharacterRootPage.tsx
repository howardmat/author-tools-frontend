import React from 'react';
import { Outlet } from 'react-router-dom';
import CharacterContextProvider from '../../store/character/character-context-provider';

const CharacterRootPage: React.FC = () => {
  return (
    <CharacterContextProvider>
      <Outlet />
    </CharacterContextProvider>
  );
};

export default CharacterRootPage;
