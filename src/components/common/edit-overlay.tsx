import { PencilSquareIcon } from '@heroicons/react/24/outline';

const hoverOpacityVariants: { [key: string]: string } = {
  '50': 'hover:opacity-50',
};

interface IEditOverlayProps {
  className?: string;
  opacity?: string;
  onClick?: () => void;
}

export default function EditOverlay({
  className,
  opacity,
  onClick,
}: IEditOverlayProps) {
  const getComponentClassName = () => {
    let componentClassName =
      'absolute flex justify-center align-middle top-0 left-0 right-0 bottom-0 w-full h-full bg-primary opacity-0';
    if (className) componentClassName += ` ${className}`;
    if (opacity) componentClassName += ` ${hoverOpacityVariants[opacity]}`;
    else componentClassName += ' hover:opacity-75';

    return componentClassName;
  };

  return (
    <div className={getComponentClassName()} onClick={onClick ?? undefined}>
      <PencilSquareIcon className='text-accent w-8' />
    </div>
  );
}
