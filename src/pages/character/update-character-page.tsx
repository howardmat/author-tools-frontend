import { useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../../components/page-heading';
import CharacterForm from '../../components/character/character-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/util/constants';
import { getCharacter, putCharacter, PutCharacterParams } from '@/http';
import { CharacterFormData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import { queryClient } from '@/http/query-client';

const UpdateCharacterPage: React.FC = () => {
  const navigate = useNavigate();

  const params = useParams();
  const characterId = params['id'] || '';

  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS, characterId],
    queryFn: ({ signal }) => getCharacter({ id: characterId, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: putCharacter,
    onMutate: async (data: PutCharacterParams) => {
      const character = data.character;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.CHARACTERS, characterId],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.CHARACTERS,
        characterId,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CHARACTERS, characterId], character);

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.CHARACTERS, characterId], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHARACTERS, characterId],
      });
    },
  });

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    mutate({
      id: characterId,
      character: {
        ...data,
        birthDate: data.birthDate?.toISOString() ?? '',
      },
    });

    navigate('/characters');
  };

  let content;

  if (isPending) {
    content = <p className='text-center'>Loading...</p>;
  }

  if (isError) {
    content = (
      <>
        <p className='text-center text-red-500'>
          Error! {error.message || 'An error has occurred'}
        </p>
      </>
    );
  }

  if (data) {
    const characterFormData: CharacterFormData = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    };
    content = (
      <CharacterForm character={characterFormData} onSave={handleSave} />
    );
  }

  return (
    <>
      <PageHeading title='Edit Character' />
      {content}
    </>
  );
};

export default UpdateCharacterPage;
