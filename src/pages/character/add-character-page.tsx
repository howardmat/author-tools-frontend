import { SubmitHandler } from 'react-hook-form';
import PageHeading from '../../components/page-heading';
import { useNavigate } from 'react-router-dom';
import { CharacterFormData } from '../../types';
import CharacterForm from '../../components/character/character-form';
import { usePostCharacterMutation } from '@/http';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { ActionTypes, AddBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';

const AddCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const addBreadcrumbTrailAction: AddBreadcrumbTrailAction = {
      type: ActionTypes.ADD_BREADCRUMB_TRAIL,
      payload: {
        name: 'Add',
      },
    };
    dispatch(addBreadcrumbTrailAction);
  }, []);

  const { mutate } = usePostCharacterMutation({
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Successfully added a new character',
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

  const handleSave: SubmitHandler<CharacterFormData> = async (data) => {
    mutate({
      ...data,
      birthDate: data.birthDate?.toISOString() ?? null,
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
  };

  const handleCancel = () => {
    navigate('/characters');
  };

  return (
    <>
      <PageHeading title='Add Character' />
      <CharacterForm
        character={new CharacterFormData()}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
};

export default AddCharacterPage;
