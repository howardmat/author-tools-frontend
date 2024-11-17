import { LoaderCircle } from 'lucide-react';
import styles from './loading-indicator.module.css';

const LoadingIndicator: React.FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full flex items-center md:w-3/4 md:mt-6'>
        <div className='mr-4 shrink-0 self-center'>
          <LoaderCircle
            className={`${styles.loadericon} w-48 h-24 text-gray-300`}
          />
        </div>
        <div>
          <h4 className='text-lg font-bold'>Loading...</h4>
          <p className='mt-1'>
            Getting your data fresh from the oven. It should only take a moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
