import { useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../../components/page-heading';
import CharacterForm from '../../components/character/character-form';
import {
  useDeleteCharacterMutation,
  useGetCharacterQuery,
  usePutCharacterMutation,
} from '@/http';
import { CharacterFormData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import LoadingIndicator from '@/components/loading-indicator';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';
import { useToast } from '@/hooks/use-toast';
import ConfirmAlert, { IConfirmAlert } from '@/components/confirm-alert';
import { useRef } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';

const UpdateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const params = useParams();
  const characterId = params['id'] || '';

  const { data, isPending } = useGetCharacterQuery(characterId);

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
        birthDate: data.birthDate?.toISOString() ?? null,
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

  const { mutate: mutateDelete } = useDeleteCharacterMutation({
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Successfully deleted the character',
        variant: 'success',
      });
      navigate('/characters');
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });

  const alertRef = useRef<IConfirmAlert>(null);
  const handleDelete = () => {
    if (alertRef.current) alertRef.current.show();
  };

  const handleCancel = () => {
    navigate('/characters');
  };

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (data) {
    const characterFormData: CharacterFormData = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      gender: data.gender?.code,
      archetype: data.archetype?.code,
    };

    content = (
      <>
        <CharacterForm
          character={characterFormData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Button
          variant='destructive'
          className='relative -top-9'
          onClick={handleDelete}
        >
          <TrashIcon />
        </Button>
        <ConfirmAlert
          ref={alertRef}
          title='Are you sure?'
          description='This will permanently delete the character.'
          confirmLabel='Continue'
          declineLabel='Cancel'
          icon='question'
          variant='destructive'
          onConfirm={() => mutateDelete(data.id || '')}
        />
      </>
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
