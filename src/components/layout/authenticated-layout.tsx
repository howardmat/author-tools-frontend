import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import HeaderSearch from './header/header-search';
import NotificationMenu from './header/notification-menu';
import SidebarMenu from './sidebar/sidebar-menu';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from '@clerk/clerk-react';

const AuthenticatedLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  console.log('test', userId);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return 'Loading...';

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className='relative z-50 lg:hidden'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
        />
        <div className='fixed inset-0 flex'>
          <DialogPanel
            transition
            className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
          >
            <TransitionChild>
              <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                <button
                  type='button'
                  onClick={() => setSidebarOpen(false)}
                  className='-m-2.5 p-2.5'
                >
                  <span className='sr-only'>Close sidebar</span>
                  <XMarkIcon
                    aria-hidden='true'
                    className='h-6 w-6 text-white'
                  />
                </button>
              </div>
            </TransitionChild>
            <SidebarMenu />
          </DialogPanel>
        </div>
      </Dialog>
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <SidebarMenu />
      </div>
      <div className='lg:pl-72'>
        <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
          <button
            type='button'
            onClick={() => setSidebarOpen(true)}
            className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
          <div
            aria-hidden='true'
            className='h-6 w-px bg-gray-900/10 lg:hidden'
          />
          <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
            <HeaderSearch />
            <div className='flex items-center gap-x-4 lg:gap-x-6'>
              <NotificationMenu />
              <div
                aria-hidden='true'
                className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
