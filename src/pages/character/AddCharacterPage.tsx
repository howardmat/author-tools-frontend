import { SubmitHandler } from 'react-hook-form';
import { ActionTypes, AddCharacterAction } from '../../actions';
import PageHeading from '../../components/layout/PageHeading';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { useNavigate } from 'react-router-dom';
import { Character, CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/CharacterForm';
import API from '../../http';

const AddCharacterPage: React.FC = () => {
  const { dispatch } = useCharacterContext();
  const navigate = useNavigate();

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    const res = await API.post<Character>('characters', data);

    const addCharacterAction: AddCharacterAction = {
      type: ActionTypes.ADD_CHARACTER,
      payload: {
        ...data,
        id: res.data.id,
      },
    };
    dispatch(addCharacterAction);

    navigate('/characters');
  };

  return (
    <>
      <PageHeading title='Add Character' />
      <CharacterForm onSave={handleSave} />
    </>
  );
};

export default AddCharacterPage;
