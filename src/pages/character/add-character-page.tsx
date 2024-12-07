import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostCharacterMutation } from '@/http';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { ActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import HeaderDetailForm, {
  HeaderFormData,
} from '@/components/header-detail-form';
import EmptyPageContent from '@/components/empty-page-content';

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

  const { mutate, isPending } = usePostCharacterMutation({
    onSuccess: (character) => {
      toast({
        title: 'Awesome!',
        description: 'Your character is ready to be edited.',
        variant: 'success',
      });
      navigate(`/characters/${character.id}/edit`);
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });

  const handleSave: SubmitHandler<HeaderFormData> = async (data) => {
    mutate({ ...data, detailSections: [] });
  };

  return (
    <>
      <HeaderDetailForm isLoading={isPending} onSave={handleSave} />
      <div className='flex justify-center mt-16'>
        <EmptyPageContent
          title='Nothing&lsquo;s here yet!'
          description='Get started by entering a name above then click Save. Your character will be created and you can continue editing them.'
          className='mt-1 w-64'
        />
      </div>
    </>
  );
};

export default AddCharacterPage;
