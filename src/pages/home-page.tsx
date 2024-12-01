import { useNavigate } from 'react-router-dom';
import styles from './home-page.module.css';
import {
  ArrowLeftEndOnRectangleIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const year = new Date().getFullYear();

  return (
    <>
      <section className={styles.content}>
        <div className={styles.overlay}>
          <h1 className='text-zinc-300 text-5xl md:text-7xl lg:text-9xl my-12'>
            WECREATE
          </h1>
          <p className='text-slate-200 text-xl md:text-3xl'>
            Character Creation
          </p>
          <div className='grid grid-cols-2 gap-x-6 my-16'>
            <SignedIn>
              <Button
                className='col-span-2'
                variant='outline'
                type='button'
                onClick={() => navigate('/characters')}
              >
                <PencilSquareIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Enter
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                variant='outline'
                type='button'
                onClick={() => navigate('/sign-in')}
              >
                <ArrowLeftEndOnRectangleIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Sign In
              </Button>
              <Button
                variant='outline'
                type='button'
                onClick={() => navigate('/sign-up')}
              >
                <PencilSquareIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Sign Up
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
      <div className={styles.placeholder}></div>
      <footer className='w-full'>
        <div className='flex justify-center items-center h-full'>
          <p className='text-zinc-600 text-sm'>
            <span className=''>WECREATE</span> &copy; {year}
          </p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
