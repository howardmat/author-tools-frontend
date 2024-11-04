import { SubmitHandler } from 'react-hook-form';

import { ActionTypes, AddCharacterAction } from '../../actions';
import PageHeading from '../../components/layout/PageHeading';
import { useCharacterContext } from '../../store/character/useCharacterContext';
import { useNavigate } from 'react-router-dom';
import { CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/CharacterForm';

const AddCharacterPage: React.FC = () => {
  const { dispatch } = useCharacterContext();
  const navigate = useNavigate();

  const handleSave: SubmitHandler<CharacterFormData> = (data) => {
    //todo: submit data to db here

    const addCharacterAction: AddCharacterAction = {
      type: ActionTypes.ADD_CHARACTER,
      payload: {
        ...data,
        id: new Date().toISOString(),
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
