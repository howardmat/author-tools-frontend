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
          <h1 className='text-zinc-300 text-6xl md:text-7xl lg:text-9xl'>
            WECREATE
          </h1>
          <p className='text-slate-200 text-3xl my-6'>Character Creation</p>
          <SignedIn>
            <div>
              <Button
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
            </div>
          </SignedIn>
          <SignedOut>
            <div>
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
            </div>
          </SignedOut>
        </div>
      </section>
      <div className={styles.placeholder}></div>
      <footer className='w-full'>
        <div className='flex justify-center items-center h-full'>
          <p className='text-zinc-600 text-sm'>
            Tools for Authors &copy; {year}
          </p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
