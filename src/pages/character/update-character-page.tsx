import { json, useNavigate, useParams } from 'react-router-dom';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { SubmitHandler } from 'react-hook-form';
import { ActionTypes, UpdateCharacterAction } from '../../actions';
import PageHeading from '../../components/layout/page-heading';
import { Character, CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/character-form';
import API from '../../http';

const UpdateCharacterPage: React.FC = () => {
  const { state, dispatch } = useCharacterContext();
  const navigate = useNavigate();

  const params = useParams();
  const characterId = params['id'] || '';
  const character = state.characters.find((c) => c.id === characterId);
  if (!character) {
    throw json({ message: 'Character Id parameter is invalid' });
  }

  const onSubmit: SubmitHandler<CharacterFormData> = async (data) => {
    await API.put<Character>('characters/' + characterId, data);

    const updateCharacterAction: UpdateCharacterAction = {
      type: ActionTypes.UPDATE_CHARACTER,
      payload: {
        ...data,
        id: character.id,
      },
    };

    dispatch(updateCharacterAction);

    navigate('/characters');
  };

  return (
    <>
      <PageHeading title='Edit Character' />
      <CharacterForm character={character} onSave={onSubmit} />
    </>
  );
};

export default UpdateCharacterPage;
