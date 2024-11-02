import { BellIcon } from '@heroicons/react/24/outline';

const NotificationMenu: React.FC = () => {
  return (
    <button
      type='button'
      className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
    >
      <span className='sr-only'>View notifications</span>
      <BellIcon aria-hidden='true' className='h-6 w-6' />
    </button>
  );
};

export default NotificationMenu;
