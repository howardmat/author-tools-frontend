import { useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../../components/page-heading';
import CharacterForm from '../../components/character/character-form';
import { useGetCharacterQuery, usePutCharacterMutation } from '@/http';
import { CharacterFormData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import LoadingIndicator from '@/components/loading-indicator';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';
import { useToast } from '@/hooks/use-toast';

const UpdateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const params = useParams();
  const characterId = params['id'] || '';

  const { data, isPending, isError, error } = useGetCharacterQuery(characterId);

  const { mutate } = usePutCharacterMutation({
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Successfully updated the character',
        variant: 'success',
      });
      navigate('/characters');
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred.',
        variant: 'destructive',
      });
    },
  });

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    mutate({
      id: characterId,
      character: {
        ...data,
        birthDate: data.birthDate?.toISOString() ?? '',
        gender: {
          code: data.gender,
          value: GenderOptions.find((g) => g.code === data.gender)?.value ?? '',
        },
        archetype: {
          code: data.archetype,
          value:
            ArchetypeOptions.find((g) => g.code === data.archetype)?.value ??
            '',
        },
      },
    });
  };

  const handleCancel = () => {
    navigate('/characters');
  };

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
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
      gender: data.gender?.code,
      archetype: data.archetype?.code,
    };
    content = (
      <CharacterForm
        character={characterFormData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
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
