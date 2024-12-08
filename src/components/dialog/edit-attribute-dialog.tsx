import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAttribute } from '@/types';
import { PropsWithChildren, useRef } from 'react';
import { newId } from '@/lib/utils';
import ConfirmAlert, { IConfirmAlert } from '../common/confirm-alert';

interface IEditAttributeDialogProps extends PropsWithChildren {
  addMode?: boolean;
  attribute?: IAttribute;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary';
  onSave: (attribute: IAttribute) => void;
  onDelete?: (id: string) => void;
}

const FormSchema = z.object({
  label: z.string().min(1, 'Label is a required field'),
  value: z.string().min(1, 'Value is a required field'),
});

const EditAttributeDialog: React.FC<IEditAttributeDialogProps> = ({
  addMode,
  attribute,
  buttonVariant,
  children,
  onSave,
  onDelete,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: attribute?.label || '',
      value: attribute?.value || '',
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const alertRef = useRef<IConfirmAlert>(null);
  const handleDeleteClick = (id: string) => {
    if (alertRef.current) {
      alertRef.current.show({
        title: 'Are you sure?',
        description: 'This will permanently delete the attribute.',
        confirmLabel: 'Continue',
        declineLabel: 'Cancel',
        icon: 'question',
        variant: 'destructive',
        onConfirm: () => (onDelete ? onDelete(id) : {}),
      });
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (attribute) onSave({ ...attribute, ...data });
    else onSave({ ...data, id: newId() });

    form.setValue('label', '');
    form.setValue('value', '');

    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  const title = addMode ? 'Add a new attribute' : 'Edit the attribute';
  const description =
    (addMode
      ? 'Create your new attribute here.'
      : 'Update your attribute here.') + " Click save when you're done.";
  const buttonText = addMode ? 'Add Attribute' : 'Update Attribute';

  const buttonContent = children ? (
    children
  ) : (
    <Button type='button' variant={buttonVariant || 'default'}>
      <PlusCircleIcon /> {buttonText}
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{buttonContent}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='label'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder='Eg. Age' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='value'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder='Eg. 23' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <div className='flex flex-1 justify-between gap-2'>
                  <div>
                    {!addMode && (
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() => handleDeleteClick(attribute?.id || '')}
                      >
                        <TrashIcon />
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button type='submit'>Save</Button>
                    <DialogClose asChild>
                      <Button
                        ref={closeButtonRef}
                        type='button'
                        variant='secondary'
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </Form>
          <ConfirmAlert ref={alertRef} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttributeDialog;
