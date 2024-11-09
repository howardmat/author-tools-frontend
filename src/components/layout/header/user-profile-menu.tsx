import { Menu, MenuButton, MenuItems } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import UserProfileMenuItem from './user-profile-menu-item';

const UserProfileMenu: React.FC = () => {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className='-m-1.5 flex items-center p-1.5'>
        <span className='sr-only'>Open user menu</span>
        <img
          alt=''
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='h-8 w-8 rounded-full bg-gray-50'
        />
        <span className='hidden lg:flex lg:items-center'>
          <span
            aria-hidden='true'
            className='ml-4 text-sm/6 font-semibold text-gray-900'
          >
            Tom Cook
          </span>
          <ChevronDownIcon
            aria-hidden='true'
            className='ml-2 h-5 w-5 text-gray-400'
          />
        </span>
      </MenuButton>
      <MenuItems
        transition
        className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
      >
        <UserProfileMenuItem name='Your profile' href='#' />
        <UserProfileMenuItem name='Logout' href='#' />
      </MenuItems>
    </Menu>
  );
};

export default UserProfileMenu;
