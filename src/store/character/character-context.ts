import { createContext } from 'react';
import { Actions } from '../../actions';
import { State } from './character-reducers';

type CharacterContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const CharacterContext = createContext<CharacterContextType | null>(null);
export default CharacterContext;
