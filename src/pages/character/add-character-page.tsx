import { SubmitHandler } from 'react-hook-form';
import PageHeading from '../../components/page-heading';
import { useNavigate } from 'react-router-dom';
import { CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/character-form';
import { useMutation } from '@tanstack/react-query';
import { postCharacter } from '@/http';
import { queryClient } from '@/http/query-client';
import { QUERY_KEYS } from '@/util/constants';

const AddCharacterPage: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: postCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
      navigate('/characters');
    },
  });

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    mutate({
      ...data,
      birthDate: data.birthDate?.toISOString() ?? '',
    });

    navigate('/characters');
  };

  return (
    <>
      <PageHeading title='Add Character' />
      {isError && <p>Failed to create character</p>}
      <CharacterForm onSave={handleSave} character={new CharacterFormData()} />
    </>
  );
};

export default AddCharacterPage;
