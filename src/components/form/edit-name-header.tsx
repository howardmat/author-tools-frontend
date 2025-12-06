import { ReactElement, useEffect, useState } from 'react';
import EditOverlay from '../common/edit-overlay';
import { Controller, useFormContext } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import loaderStyles from './loading-styles.module.css';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Field, FieldError } from '../ui/field';

interface IEditNameHeaderProps {
  name: string;
  onNameSave?: () => void;
  isSaving?: boolean;
}

export default function EditNameHeader({
  name,
  onNameSave,
  isSaving,
}: IEditNameHeaderProps) {
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
      <div className='relative w-full mt-3 lg:mt-0'>
        <Controller
          control={form.control}
          name={name}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                type='text'
                className='py-8 font-bold'
                placeholder='Type a name and click save'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <div className='flex justify-center gap-1 mt-4 lg:absolute lg:right-2 lg:bottom-2'>
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
      <div className='relative w-full text-center mt-6 lg:text-left lg:mt-0'>
        <h1 className='scroll-m-20 text-4xl font-bold px-3'>{nameContent}</h1>
        <EditOverlay opacity='50' className='rounded-md' />
      </div>
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
}
