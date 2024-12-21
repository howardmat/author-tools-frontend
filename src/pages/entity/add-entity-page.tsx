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

interface IAddEntityPageProps {
  entityType: EntityQueryType;
  title: string;
  entityBaseUrl: string;
  entityName?: string;
  breadcrumbTitle?: string;
}

const AddEntityPage: React.FC<IAddEntityPageProps> = ({
  entityType,
  title,
  entityBaseUrl,
  entityName,
  breadcrumbTitle,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dispatch } = useBreadcrumbContext();

  breadcrumbTitle = breadcrumbTitle || title;
  entityName = entityName || title;

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: breadcrumbTitle, url: entityBaseUrl }, { name: 'Add' }],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = usePostEntityMutation(entityType, {
    onSuccess: (entity) => {
      toast({
        title: 'Awesome!',
        description: `Your ${entityName} is ready to be edited.`,
        variant: 'success',
      });
      navigate(`${entityBaseUrl}/${entity.id}/edit`);
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
          description={`Get started by entering a name above then click Save. Your ${entityName} will be created and you can continue editing them.`}
          className='mt-1 w-64'
        />
      </div>
    </>
  );
};

export default AddEntityPage;
