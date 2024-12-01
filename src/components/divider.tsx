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
      <ChevronDoubleDownIcon aria-hidden='true' className='size-5' />
    );
  } else {
    iconContent = <ChevronDoubleUpIcon aria-hidden='true' className='size-5' />;
  }
  return (
    <div className={className}>
      <div className='relative'>
        <div aria-hidden='true' className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-primary-background' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-background px-2 text-primary'>{iconContent}</span>
        </div>
      </div>
    </div>
  );
};

export default Divider;
