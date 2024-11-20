import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const PageHeading: React.FC<{ title: string; addRoute?: string | null }> = ({
  title,
  addRoute,
}) => {
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
            <Link
              to={addRoute}
              className='inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              <PlusCircleIcon aria-hidden='true' className='-ml-0.5 h-5 w-5' />
              Add
            </Link>
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
