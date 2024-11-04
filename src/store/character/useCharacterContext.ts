import { useContext } from 'react';
import CharacterContext from './character-context';

export function useCharacterContext() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error(
      'CharacterContext must be used within CharacterContextProvider'
    );
  }

  return context;
}
