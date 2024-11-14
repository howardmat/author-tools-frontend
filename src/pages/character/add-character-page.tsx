import { SubmitHandler } from 'react-hook-form';
import PageHeading from '../../components/page-heading';
import { useNavigate } from 'react-router-dom';
import { CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/character-form';
import { usePostCharacterMutation } from '@/http';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';

const AddCharacterPage: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isError } = usePostCharacterMutation();

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    mutate({
      ...data,
      birthDate: data.birthDate?.toISOString() ?? '',
      gender: {
        code: data.gender,
        value: GenderOptions.find((g) => g.code === data.gender)?.value ?? '',
      },
      archetype: {
        code: data.archetype,
        value:
          ArchetypeOptions.find((g) => g.code === data.archetype)?.value ?? '',
      },
    });

    navigate('/characters');
  };

  const handleCancel = () => {
    navigate('/characters');
  };

  return (
    <>
      <PageHeading title='Add Character' />
      {isError && <p>Failed to create character</p>}
      <CharacterForm
        character={new CharacterFormData()}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
};

export default AddCharacterPage;
