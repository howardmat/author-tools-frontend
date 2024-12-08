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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, PropsWithChildren, useRef } from 'react';
import { Textarea } from '../ui/textarea';

interface IEditNoteDialogProps extends PropsWithChildren {
  currentNoteContent?: string | null;
  onSave: (noteContent: string) => void;
}

const FormSchema = z.object({
  noteContent: z.string().min(1, 'Some content is required'),
});

const EditNoteDialog = forwardRef<HTMLButtonElement, IEditNoteDialogProps>(
  ({ currentNoteContent, onSave, children }, ref) => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        noteContent: currentNoteContent || '',
      },
    });

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
      onSave(data.noteContent);

      if (closeButtonRef.current) closeButtonRef.current.click();
    };

    return (
      <Dialog>
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-1 items-center gap-4'>
                    <FormField
                      control={form.control}
                      name='noteContent'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
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
  }
);

export default EditNoteDialog;
