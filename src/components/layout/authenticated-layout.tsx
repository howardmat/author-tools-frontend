import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import LoadingIndicator from '../common/loading-indicator';
import { SidebarMenu } from './sidebar/sidebar-menu';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppBreadcrumb from './app-breadcrumb';
import BreadcrumbContextProvider from '@/store/breadcrumb/breadcrumb-context-provider';

const AuthenticatedLayout: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return <LoadingIndicator />;

  return (
    <>
      <BreadcrumbContextProvider>
        <SidebarProvider>
          <SidebarMenu />
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <AppBreadcrumb />
              </div>
            </header>
            <div className='mx-6 mb-6'>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </BreadcrumbContextProvider>
      <Toaster />
    </>
  );
};

export default AuthenticatedLayout;
