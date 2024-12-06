import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CharacterFormData } from '../../types';
import { usePostCharacterMutation } from '@/http';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { ActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import CharacterFormV2 from '@/components/character/character-form-v2';

const AddCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: ActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: 'Characters', url: '/characters' }, { name: 'Add' }],
    };
    dispatch(setBreadcrumbTrailAction);
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
      <CharacterFormV2
        character={new CharacterFormData()}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
};

export default AddCharacterPage;
