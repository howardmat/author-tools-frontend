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
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Field, FieldError, FieldLabel } from '../ui/field';

interface IEditNoteDialogProps extends PropsWithChildren {
  currentNoteContent?: string | null;
  onSave: (noteContent: string) => void;
}

const FormSchema = z.object({
  noteContent: z.string().min(1, 'Some content is required'),
});

function EditNoteDialog({ 
  currentNoteContent, onSave, children, ref 
}: IEditNoteDialogProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      noteContent: currentNoteContent || '',
    },
  });

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave(data.noteContent);
    form.resetField('noteContent', { defaultValue: data.noteContent });

    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open)
      form.reset(undefined, { keepDefaultValues: true });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger ref={ref} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update the details</DialogTitle>
          <DialogDescription>
            Add any details you like here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-1 items-center gap-4'>
                <Controller
                  control={form.control}
                  name='noteContent'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="form-content">Content</FieldLabel>
                      <Textarea 
                        {...field}
                        id="form-content"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditNoteDialog;
