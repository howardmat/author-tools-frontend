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
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { IDetailSection } from '@/types';
import { newId } from '@/lib/utils';
import ConfirmAlert, { IConfirmAlert } from '../common/confirm-alert';

const FormSchema = z.object({
  title: z.string().min(1, 'Title is a required field'),
  type: z.enum(['attribute', 'note'], {
    message: 'You need to select a type.',
  }),
});

interface IEditSectionDialogProps extends PropsWithChildren {
  addMode?: boolean;
  section?: IDetailSection;
  onSave: (section: IDetailSection) => void;
  onDelete?: (id: string) => void;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary';
}

export default function EditSectionDialog({
  addMode,
  section,
  onSave,
  onDelete,
  buttonVariant,
  children,
}: IEditSectionDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: section?.title || '',
      type: section?.type || 'attribute',
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const alertRef = useRef<IConfirmAlert>(null);
  const handleDeleteClick = (id: string) => {
    if (alertRef.current) {
      alertRef.current.show({
        title: 'Are you sure?',
        description:
          "This will permanently delete the section and all of it's attributes.",
        confirmLabel: 'Continue',
        declineLabel: 'Cancel',
        icon: 'question',
        variant: 'destructive',
        onConfirm: () => (onDelete ? onDelete(id) : {}),
      });
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (section) onSave({ ...section, ...data });
    else onSave({ ...data, id: newId(), noteContent: '', attributes: [] });

    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    form.reset({
      title: section?.title || '',
      type: section?.type || 'attribute',
    });
  };

  const title = addMode ? 'Add a new section' : 'Edit the section';
  const description =
    (addMode ? 'Create your new section here.' : 'Update your section here.') +
    " Click save when you're done.";
  const buttonText = addMode ? 'Create Section' : 'Update Section';

  const triggerContent = children ? (
    children
  ) : (
    <Button type='button' variant={buttonVariant || 'default'}>
      <PlusCircleIcon /> {buttonText}
    </Button>
  );

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
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
                    defaultValue={section?.title || ''}
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
                            {(addMode || section?.type === 'attribute') && (
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='attribute' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Attribute List
                                </FormLabel>
                              </FormItem>
                            )}
                            {(addMode || section?.type === 'note') && (
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='note' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Open Text / Note area
                                </FormLabel>
                              </FormItem>
                            )}
                          </RadioGroup>
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
                        onClick={() => handleDeleteClick(section?.id || '')}
                      >
                        <TrashIcon />
                      </Button>
                    )}
                  </div>
                  <div className='flex gap-2'>
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
}
