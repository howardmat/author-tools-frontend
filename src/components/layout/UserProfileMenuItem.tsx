import { MenuItem } from '@headlessui/react';

const UserProfileMenuItem: React.FC<{ name: string; href: string }> = ({
  name,
  href,
}) => {
  return (
    <MenuItem key={name}>
      <a
        href={href}
        className='block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none'
      >
        {name}
      </a>
    </MenuItem>
  );
};

export default UserProfileMenuItem;
