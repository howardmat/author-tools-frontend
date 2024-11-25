import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  title?: string;
  className?: string;
  noPad?: boolean;
}

const Card: React.FC<CardProps> = ({ className, title, noPad, children }) => {
  let containerStyle = '';
  if (!noPad) containerStyle = 'px-4 py-5 sm:p-6';

  return (
    <div
      className={`${className} divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow`}
    >
      {title && <div className='px-4 py-5 sm:px-6'>{title}</div>}
      <div className={containerStyle}>{children}</div>
    </div>
  );
};

export default Card;
