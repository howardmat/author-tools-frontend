import { useNavigate } from 'react-router-dom';
import styles from './home-page.module.css';
import {
  ArrowLeftEndOnRectangleIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const year = new Date().getFullYear();

  return (
    <>
      <section className={styles.parallaxcontainer}>
        <div className={styles.overlay}>
          <h1 className='text-zinc-300 text-9xl'>Tools for Authors</h1>
          <p className='text-slate-200 text-xlg my-6'>
            Tools for Authors offers a suite of tools to manage and maintain
            characters and other story related items.
          </p>
          <SignedIn>
            <div>
              <button
                type='button'
                className='mx-3 my-3 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => navigate('/characters')}
              >
                <PencilSquareIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Enter
              </button>
            </div>
          </SignedIn>
          <SignedOut>
            <div>
              <button
                type='button'
                className='mx-3 my-3 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => navigate('/sign-in')}
              >
                <ArrowLeftEndOnRectangleIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Sign In
              </button>
              <button
                type='button'
                className='mx-3 my-3 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => navigate('/sign-up')}
              >
                <PencilSquareIcon
                  aria-hidden='true'
                  className='-ml-0.5 size-5'
                />
                Sign Up
              </button>
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
