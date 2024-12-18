import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface IEmptyPageProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionRoute?: string;
  className?: string;
}

const EmptyPageContent: React.FC<IEmptyPageProps> = ({
  title,
  description,
  actionLabel,
  actionRoute,
  className,
}) => {
  return (
    <div className={`text-center ${className}`}>
      <svg
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
        className='mx-auto size-12 text-gray-400'
      >
        <path
          d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
          strokeWidth={2}
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <h3 className='mt-2 text-sm font-semibold text-primary'>{title}</h3>
      {description && (
        <p className='mt-1 text-sm text-gray-500'>{description}</p>
      )}
      {actionRoute && (
        <div className='mt-6'>
          <Link to={actionRoute}>
            <Button>
              <PlusCircleIcon />
              {actionLabel}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyPageContent;
