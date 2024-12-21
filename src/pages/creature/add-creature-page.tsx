import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { BreadcrumbActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import HeaderDetailForm, {
  HeaderFormData,
} from '@/components/form/header-detail-form';
import EmptyPageContent from '@/components/common/empty-page-content';
import { usePostEntityMutation } from '@/hooks/use-entity-query';
import { EntityQueryType } from '@/types';

const AddCreaturePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: 'Creatures', url: '/creatures' }, { name: 'Add' }],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = usePostEntityMutation(
    EntityQueryType.creature,
    {
      onSuccess: (creature) => {
        toast({
          title: 'Awesome!',
          description: 'Your creature is ready to be edited.',
          variant: 'success',
        });
        navigate(`/creatures/${creature.id}/edit`);
      },
      onError: (error?: Error) => {
        toast({
          title: 'Error!',
          description: error?.message ?? 'An unexpected error occurred',
          variant: 'destructive',
        });
      },
    }
  );

  const handleSave: SubmitHandler<HeaderFormData> = async (data) => {
    mutate({ ...data, detailSections: [] });
  };

  return (
    <>
      <HeaderDetailForm isLoading={isPending} onSave={handleSave} />
      <div className='flex justify-center mt-16'>
        <EmptyPageContent
          title='Nothing&lsquo;s here yet!'
          description='Get started by entering a name above then click Save. Your creature will be created and you can continue editing them.'
          className='mt-1 w-64'
        />
      </div>
    </>
  );
};

export default AddCreaturePage;
