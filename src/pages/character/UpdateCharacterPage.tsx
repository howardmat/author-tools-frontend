import { json, useNavigate, useParams } from 'react-router-dom';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { SubmitHandler } from 'react-hook-form';
import { ActionTypes, UpdateCharacterAction } from '../../actions';
import PageHeading from '../../components/layout/PageHeading';
import { CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/CharacterForm';

const UpdateCharacterPage: React.FC = () => {
  const { state, dispatch } = useCharacterContext();
  const navigate = useNavigate();

  const params = useParams();
  const characterId = params['id'];
  const character = state.characters.find((c) => c.id === characterId);
  if (!character) {
    throw json({ message: 'Character Id parameter is invalid' });
  }

  const onSubmit: SubmitHandler<CharacterFormData> = (data) => {
    //todo: submit data to db here

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
