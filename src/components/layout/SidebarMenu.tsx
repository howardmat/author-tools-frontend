import { NavLink } from 'react-router-dom';
import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Characters', href: '/characters', icon: UsersIcon, current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const SidebarMenu: React.FC = () => {
  return (
    <>
      <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4'>
        <div className='flex h-16 shrink-0 items-center'>
          <img
            alt='Your Company'
            src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500'
            className='h-8 w-auto'
          />
        </div>
        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-7'>
            <li>
              <ul role='list' className='-mx-2 space-y-1'>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        )
                      }
                    >
                      <item.icon
                        aria-hidden='true'
                        className='h-6 w-6 shrink-0'
                      />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className='mt-auto'>
              <NavLink
                to='/'
                className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white'
              >
                <Cog6ToothIcon
                  aria-hidden='true'
                  className='h-6 w-6 shrink-0'
                />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
