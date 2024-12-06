import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface EditOverlayProps {
  className?: string;
  opacity?: string;
}
const EditOverlay: React.FC<EditOverlayProps> = ({ className, opacity }) => {
  let componentClassName =
    'absolute flex justify-center align-middle top-0 left-0 right-0 bottom-0 w-full h-full bg-primary opacity-0';
  if (className) componentClassName += ` ${className}`;
  if (opacity) componentClassName += ` hover:opacity-${opacity}`;
  else componentClassName += ' hover:opacity-75';

  return (
    <div className={componentClassName}>
      <PencilSquareIcon className='text-accent w-8' />
    </div>
  );
};

export default EditOverlay;
