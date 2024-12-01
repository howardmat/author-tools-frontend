import { ActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import PageHeading from '@/components/page-heading';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { useEffect } from 'react';

const SettingsPage: React.FC = () => {
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: ActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [
        {
          name: 'Settings',
          url: '/settings',
        },
      ],
    };
    dispatch(setBreadcrumbTrailAction);
  }, [dispatch]);

  return (
    <>
      <PageHeading title='Settings' />
      <div className='space-y-12'>
        <div className='border-b pb-12'>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Options &amp; Configuration
          </h4>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Once we have settings you'll be able to change them here!
          </p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
