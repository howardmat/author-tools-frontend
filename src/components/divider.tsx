import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/20/solid';

interface DividerProps {
  orientation: 'up' | 'down';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation, className }) => {
  let iconContent;

  if (orientation === 'down') {
    iconContent = (
      <ChevronDoubleDownIcon
        aria-hidden='true'
        className='size-5 text-gray-500'
      />
    );
  } else {
    iconContent = (
      <ChevronDoubleUpIcon
        aria-hidden='true'
        className='size-5 text-gray-500'
      />
    );
  }
  return (
    <div className={className}>
      <div className='relative'>
        <div aria-hidden='true' className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-gray-500'>{iconContent}</span>
        </div>
      </div>
    </div>
  );
};

export default Divider;
