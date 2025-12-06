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
import { PropsWithChildren, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { IDetailSection } from '@/types';
import { newId } from '@/lib/utils';
import ConfirmAlert, { IConfirmAlert } from '../common/confirm-alert';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Label } from '../ui/label';

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

  const [open, setOpen] = useState<boolean>(false);

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

    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open){
      form.reset({
        title: section?.title || '',
        type: section?.type || 'attribute',
      });
    }
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-1 items-center gap-4'>
                <Controller
                  control={form.control}
                  name='title'
                  defaultValue={section?.title || ''}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="form-title">Title</FieldLabel>
                      <Input 
                        id="form-title"
                        {...field}
                        placeholder='' 
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 items-center gap-4'>
                <Controller
                  control={form.control}
                  name='type'
                  render={({ field, fieldState }) => (
                    <Field className='space-y-3'>
                      <FieldLabel htmlFor="form-type">Pick a type...</FieldLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col space-y-1'
                      >
                        {(addMode || section?.type === 'attribute') && (
                          <div className='flex items-center space-x-3 space-y-0'>
                            <RadioGroupItem id='attribute'value='attribute' />
                            <Label htmlFor='attribute' className='font-normal'>Attribute List</Label>
                          </div>
                        )}
                        {(addMode || section?.type === 'note') && (
                          <div className='flex items-center space-x-3 space-y-0'>
                            <RadioGroupItem id='note' value='note' />
                            <Label htmlFor='note' className='font-normal'>Open Text / Note area</Label>
                          </div>
                        )}
                      </RadioGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
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
          <ConfirmAlert ref={alertRef} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
