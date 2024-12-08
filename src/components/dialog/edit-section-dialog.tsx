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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { DetailSection } from '@/types';

const FormSchema = z.object({
  title: z.string().min(1, 'Title is a required field'),
  type: z.enum(['attribute', 'note'], {
    required_error: 'You need to select a type.',
  }),
});

interface IEditSectionDialogProps extends PropsWithChildren {
  addMode?: boolean;
  onSave: (section: DetailSection) => void;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary';
}

const EditSectionDialog: React.FC<IEditSectionDialogProps> = ({
  addMode,
  onSave,
  buttonVariant,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      type: 'attribute',
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave({ ...data, noteContent: '', attributes: [] });

    form.setValue('title', '');
    form.setValue('type', 'attribute');

    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  const title = addMode ? 'Add a new section' : 'Edit the section';
  const description =
    (addMode ? 'Create your new section here.' : 'Update your section here.') +
    " Click save when you're done.";
  const buttonText = addMode ? 'Create Section' : 'Update Section';

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
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder='' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel>Pick a type...</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex flex-col space-y-1'
                          >
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='attribute' />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                Attribute List
                              </FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='note' />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                Open Text / Note area
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
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

export default EditSectionDialog;
