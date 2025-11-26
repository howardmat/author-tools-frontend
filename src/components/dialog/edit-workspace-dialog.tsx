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
import { MouseEvent, PropsWithChildren, useRef } from 'react';
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
import { TrashIcon } from '@heroicons/react/20/solid';
import { IWorkspace } from '@/types';
import ConfirmAlert, { IConfirmAlert } from '../common/confirm-alert';
import ComboBox from '../ui/combobox';
import {
  Activity,
  Anvil,
  Aperture,
  Atom,
  Biohazard,
  Bird,
  Component,
  Pencil,
  Plus,
  Webhook,
} from 'lucide-react';
import { getWorkspaceIcon } from '@/lib/tsx-utils';
import { Checkbox } from '../ui/checkbox';

const FormSchema = z.object({
  name: z.string().min(1, 'A name is required'),
  description: z.string(),
  icon: z.string().min(1, 'An icon is required'),
  isDefault: z.boolean(),
});

interface IEditWorkspaceDialogProps extends PropsWithChildren {
  addMode?: boolean;
  workspace?: IWorkspace;
  onSave: (workspace: IWorkspace) => void;
  onDelete?: (id: string) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

function EditWorkspaceDialog({
  addMode, workspace, onSave, onDelete, onClick, ref
}: IEditWorkspaceDialogProps & { ref?: React.Ref<HTMLButtonElement> }){
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: workspace?.name || '',
      description: workspace?.description || '',
      icon: workspace?.icon || '',
      isDefault: workspace?.isDefault || false,
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const alertRef = useRef<IConfirmAlert>(null);
  const handleDeleteClick = (id: string) => {
    if (alertRef.current) {
      alertRef.current.show({
        title: 'Are you sure?',
        description: 'This will permanently delete the workspace.',
        confirmLabel: 'Continue',
        declineLabel: 'Cancel',
        icon: 'question',
        variant: 'destructive',
        onConfirm: () => (onDelete ? onDelete(id) : {}),
      });
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (workspace) onSave({ ...workspace, ...data });
    else onSave({ ...data, id: '' });

    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    form.reset({
      name: workspace?.name || '',
      description: workspace?.description || '',
      icon: workspace?.icon || '',
      isDefault: workspace?.isDefault || false,
    });
  };

  const title = addMode ? 'Add a new workspace' : 'Edit the workspace';
  const description =
    (addMode
      ? 'Create your new workspace here.'
      : 'Update your workspace here.') + " Click save when you're done.";

  const iconOptions = [
    { code: 'activity', value: 'activity', displayValue: <Activity /> },
    {
      code: 'anvil',
      value: 'anvil',
      displayValue: <Anvil />,
    },
    {
      code: 'aperture',
      value: 'aperture',
      displayValue: <Aperture />,
    },
    { code: 'atom', value: 'atom', displayValue: <Atom /> },
    {
      code: 'biohazard',
      value: 'biohazard',
      displayValue: <Biohazard />,
    },
    {
      code: 'bird',
      value: 'bird',
      displayValue: <Bird />,
    },
    {
      code: 'component',
      value: 'component',
      displayValue: <Component />,
    },
    {
      code: 'webhook',
      value: 'webhook',
      displayValue: <Webhook />,
    },
  ];

  const triggerContent = addMode ? (
    <div
      role='menuitem'
      className='relative p-2 cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 flex gap-2'
    >
      <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
        <Plus className='size-4' />
      </div>
      <span className='font-medium text-muted-foreground'>Add Workspace</span>
    </div>
  ) : (
    <div
      role='menuitem'
      className='relative p-2 cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 flex gap-2'
    >
      <div
        className='flex size-6 items-center justify-center rounded-sm border'
        onClick={onClick}
      >
        {getWorkspaceIcon(workspace?.icon)}
      </div>
      <span className='mr-auto' onClick={onClick}>
        {workspace?.name}
      </span>
      <Button className='flex size-6 items-center justify-center'>
        <Pencil className='size-4 shrink-0' />
      </Button>
    </div>
  );

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger ref={ref} asChild>
        {triggerContent}
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
                    name='name'
                    defaultValue={workspace?.name || ''}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder='' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <ComboBox
                    name='icon'
                    label='Icon'
                    placeholder='Select an icon'
                    options={iconOptions}
                  />
                </div>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='isDefault'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Workspace</FormLabel>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                        onClick={() => handleDeleteClick(workspace?.id || '')}
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

export default EditWorkspaceDialog;
