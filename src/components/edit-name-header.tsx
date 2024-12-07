import { ReactElement, useEffect, useState } from 'react';
import EditOverlay from './edit-overlay';
import { useFormContext } from 'react-hook-form';
import { Button } from './ui/button';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { LoaderCircle } from 'lucide-react';
import loaderStyles from './loading-indicator.module.css';

interface EditNameHeaderProps {
  name: string;
  onNameSave?: () => void;
  isSaving?: boolean;
}

const EditNameHeader: React.FC<EditNameHeaderProps> = ({
  name,
  onNameSave,
  isSaving,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useFormContext();

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    if (onNameSave) onNameSave();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
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
      <div className='relative w-full'>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  type='text'
                  className='border-0 border-b-primary focus:border-b-primary border-b h-full w-full focus:ring-0 font-bold text-4xl dark:bg-primary-foreground'
                  placeholder='Type a name and click save'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='absolute right-0 bottom-2 flex gap-1'>
          <Button
            type='button'
            className='h-12'
            onClick={handleSaveClick}
            disabled={isSaving}
          >
            {isSaving && <LoaderCircle className={`${loaderStyles.spin}`} />}
            {!isSaving && <>Save</>}
          </Button>
          <Button
            type='button'
            className='h-12'
            onClick={handleCancelClick}
            disabled={isSaving}
            variant='outline'
          >
            {isSaving && <LoaderCircle className={`${loaderStyles.spin}`} />}
            {!isSaving && <>Cancel</>}
          </Button>
        </div>
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
    if (isEditing) form.setFocus(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
