import { Character } from '../types';

export enum ActionTypes {
  SET_CHARACTERS = 'SET_CHARACTERS',
  ADD_CHARACTER = 'ADD_CHARACTER',
  UPDATE_CHARACTER = 'UPDATE_CHARACTER',
}

export type SetCharactersAction = {
  type: ActionTypes.SET_CHARACTERS;
  payload: Character[];
};

export type AddCharacterAction = {
  type: ActionTypes.ADD_CHARACTER;
  payload: Character;
};

export type UpdateCharacterAction = {
  type: ActionTypes.UPDATE_CHARACTER;
  payload: Character;
};

export type Actions =
  | SetCharactersAction
  | AddCharacterAction
  | UpdateCharacterAction;
