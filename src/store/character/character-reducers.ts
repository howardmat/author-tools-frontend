import { ActionTypes, Actions } from '../../actions';
import { Character } from '../../types';

export type State = {
  characters: Character[];
};

export const initialState: State = {
  characters: [],
};

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    case ActionTypes.ADD_CHARACTER: {
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };
    }

    case ActionTypes.UPDATE_CHARACTER: {
      const stateCopy = {
        ...state,
        characters: [...state.characters],
      };

      const characterIndex = stateCopy.characters.findIndex(
        (c) => c.id === action.payload.id
      );

      if (characterIndex < 0) {
        throw new Error('Character not found. Cannot update character.');
      }

      stateCopy.characters[characterIndex] = action.payload;

      return stateCopy;
    }

    default:
      return state;
  }
}
