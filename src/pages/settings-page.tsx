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
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            Options &amp; Configuration
          </h2>
          <p className='mt-1 text-sm/6 text-gray-600'>
            Once we have settings you'll be able to change them here!
          </p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
