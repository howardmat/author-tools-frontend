import { PropsWithChildren, useReducer } from 'react';
import { initialState, reducer } from './character-reducers';
import CharacterContext from './character-context';

const CharacterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContextProvider;
