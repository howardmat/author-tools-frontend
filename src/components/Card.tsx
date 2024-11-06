import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, title, children }) => {
  return (
    <div
      className={`${className} divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow`}
    >
      {title && <div className='px-4 py-5 sm:px-6'>{title}</div>}
      <div className='px-4 py-5 sm:p-6'>{children}</div>
    </div>
  );
};

export default Card;
