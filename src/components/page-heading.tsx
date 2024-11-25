import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const PageHeading: React.FC<{ title: string; addRoute?: string | null }> = ({
  title,
  addRoute,
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (addRoute) navigate(addRoute);
  };

  return (
    <>
      <div className='my-2 md:flex md:items-center md:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            {title}
          </h2>
        </div>
        {addRoute && (
          <div className='mt-4 flex flex-shrink-0 md:ml-4 md:mt-0'>
            <Button onClick={handleAddClick}>
              <PlusCircleIcon aria-hidden='true' className='-ml-0.5 h-5 w-5' />
              Add
            </Button>
          </div>
        )}
      </div>
      <div className='my-6'>
        <div className='w-full border-t border-gray-300' />
      </div>
    </>
  );
};

export default PageHeading;
