import { useEffect } from 'react';
import PageHeading from '../../components/layout/PageHeading';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { Character } from '../../types';
import { ActionTypes, SetCharactersAction } from '../../actions';
import CharacterList from '../../components/character/CharacterList';
import API from '../../http';

const CharacterListPage: React.FC = () => {
  const { state, dispatch } = useCharacterContext();

  useEffect(() => {
    const initializeData = async () => {
      const res = await API.get<Character[]>('characters');

      // call set characters action with the results from the http call
      const setCharactersAction: SetCharactersAction = {
        type: ActionTypes.SET_CHARACTERS,
        payload: res.data,
      };

      dispatch(setCharactersAction);
    };

    initializeData();
  }, [dispatch]);

  return (
    <>
      <PageHeading title='Characters' addRoute='/characters/add' />
      <CharacterList characters={state.characters} />
    </>
  );
};

export default CharacterListPage;
