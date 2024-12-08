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
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Attribute } from '@/types';
import { useRef } from 'react';

interface IEditAttributeDialogProps {
  addMode?: boolean;
  onSave: (attribute: Attribute) => void;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary';
}

const FormSchema = z.object({
  label: z.string().min(1, 'Label is a required field'),
  value: z.string().min(1, 'Value is a required field'),
});

const EditAttributeDialog: React.FC<IEditAttributeDialogProps> = ({
  addMode,
  onSave,
  buttonVariant,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      value: '',
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave({ ...data });

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant={buttonVariant || 'default'}>
          <PlusCircleIcon /> {buttonText}
        </Button>
      </DialogTrigger>
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
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttributeDialog;
