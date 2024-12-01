import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
      <div className='my-4 md:flex md:items-center md:justify-between'>
        <div className='min-w-0 flex-1'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            {title}
          </h1>
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
        <Separator />
      </div>
    </>
  );
};

export default PageHeading;
