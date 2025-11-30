import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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

export default function AddEntityPage({
  entityType,
  title,
  entityBaseUrl,
  entityName,
  breadcrumbTitle,
}: IAddEntityPageProps) {
  const navigate = useNavigate();
  const { dispatch } = useBreadcrumbContext();

  breadcrumbTitle = breadcrumbTitle || title;
  entityName = entityName || title;

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [
        { name: `${breadcrumbTitle}s`, url: entityBaseUrl },
        { name: 'Add' },
      ],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = usePostEntityMutation(entityType, {
    onSuccess: (entity) => {
      toast.success('Awesome!',{
        description: `Your ${entityName} is ready to be edited.`,
      });
      navigate(`${entityBaseUrl}/${entity.id}/edit`);
    },
    onError: (error?: Error) => {
      toast.error('Oops!', {
        description: error?.message ?? 'An unexpected error occurred',
      });
    },
  });

  const handleSave: SubmitHandler<HeaderFormData> = async (data) => {
    mutate({ ...data, detailSections: [], workspaceId: '' });
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
}
