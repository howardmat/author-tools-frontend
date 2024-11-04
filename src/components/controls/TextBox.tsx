import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../util';
import { forwardRef, PropsWithChildren } from 'react';

interface TextBoxProps extends PropsWithChildren {
  id: string;
  error?: string | null;
}

export type Ref = HTMLInputElement;

const TextBox = forwardRef<Ref, TextBoxProps>(
  ({ id, error, children, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className='block text-sm/6 font-medium text-gray-900'
        >
          {children}
        </label>
        <div className='relative mt-2 rounded-md shadow-sm'>
          <input
            type='text'
            ref={ref}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={classNames(
              error
                ? 'pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                : 'text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
              'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm/6'
            )}
            {...props}
          />
          {error && (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <ExclamationCircleIcon
                aria-hidden='true'
                className='h-5 w-5 text-red-500'
              />
            </div>
          )}
        </div>
        {error && (
          <p id={`${id}-error`} className='mt-2 text-sm text-red-600'>
            {error}
          </p>
        )}
      </>
    );
  }
);

export default TextBox;
