import { useEffect } from 'react';
import PageHeading from '../../components/layout/PageHeading';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { Character } from '../../types';
import { ActionTypes, SetCharactersAction } from '../../actions';
import CharacterList from '../../components/character/CharacterList';

const CHARACTERS: Character[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
  },
];

const CharacterListPage: React.FC = () => {
  const { state, dispatch } = useCharacterContext();

  useEffect(() => {
    console.log(state.characters);
    if (!state.characters.length) {
      //todo: fetch characters from db here...

      // call set characters action with the results from the http call
      const setCharactersAction: SetCharactersAction = {
        type: ActionTypes.SET_CHARACTERS,
        payload: CHARACTERS,
      };

      dispatch(setCharactersAction);
    }
  }, [state, dispatch]);

  return (
    <>
      <PageHeading title='Characters' addRoute='/characters/add' />
      <CharacterList characters={state.characters} />
    </>
  );
};

export default CharacterListPage;
