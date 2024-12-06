import { ReactElement, useEffect, useRef, useState } from 'react';
import EditOverlay from './edit-overlay';
import { useFormContext } from 'react-hook-form';
import { Button } from './ui/button';

interface EditNameHeaderProps {
  name: string;
  onNameSave?: () => void;
}

const EditNameHeader: React.FC<EditNameHeaderProps> = ({
  name,
  onNameSave,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (onNameSave) onNameSave();
  };

  const nameValue = form.getValues(name);
  const nameContent = !nameValue ? (
    <span className='text-muted-foreground'>Click here to enter a name</span>
  ) : (
    <span>{nameValue}</span>
  );

  let content: ReactElement;
  if (isEditing) {
    content = (
      <div className='relative  w-full'>
        <input
          ref={inputRef}
          type='text'
          className='border-0 border-b-primary focus:border-b-primary border-b h-full w-full 
            focus:ring-0 font-bold text-4xl dark:bg-primary-foreground'
          placeholder='Type a name and click save'
        />
        <Button
          type='button'
          className='absolute right-0 bottom-2 h-12'
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    );
  } else {
    content = (
      <>
        <h1 className='scroll-m-20 text-4xl font-bold px-3'>{nameContent}</h1>
        <EditOverlay opacity='50' className='rounded-md' />
      </>
    );
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className='relative flex flex-1 items-center px-2'
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default EditNameHeader;
