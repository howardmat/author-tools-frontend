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
import { MouseEvent, PropsWithChildren, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TrashIcon } from '@heroicons/react/20/solid';
import { IWorkspace } from '@/types';
import ConfirmAlert, { IConfirmAlert } from '../common/confirm-alert';
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
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

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

  const [open, setOpen] = useState<boolean>(false);

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

    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open){
      form.reset({
        name: workspace?.name || '',
        description: workspace?.description || '',
        icon: workspace?.icon || '',
        isDefault: workspace?.isDefault || false,
      });
    }
  };

  const title = addMode ? 'Add a new workspace' : 'Edit the workspace';
  const description =
    (addMode
      ? 'Create your new workspace here.'
      : 'Update your workspace here.') + " Click save when you're done.";

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger ref={ref} asChild>
        {triggerContent}
      </DialogTrigger>
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
                    name='name'
                    defaultValue={workspace?.name || ''}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="form-name">Name</FieldLabel>
                        <Input
                          {...field} 
                          placeholder=''
                          id="form-name"
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
                    name='description'
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="form-description">Description</FieldLabel>
                        <Input 
                          {...field}
                          placeholder=''  
                          id="form-description"
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
                    name='icon'
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="form-icon">Icon</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="activity"><Activity /></SelectItem>
                            <SelectItem value="anvil"><Anvil /></SelectItem>
                            <SelectItem value="aperture"><Aperture /></SelectItem>
                            <SelectItem value="atom"><Atom /></SelectItem>
                            <SelectItem value="biohazard"><Biohazard /></SelectItem>
                            <SelectItem value="bird"><Bird /></SelectItem>
                            <SelectItem value="component"><Component /></SelectItem>
                            <SelectItem value="webhook"><Webhook /></SelectItem>
                          </SelectContent>
                        </Select>
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
                    name='isDefault'
                    render={({ field, fieldState }) => (
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id="form-isDefault"
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}  />
                        <Label htmlFor="form-isDefault">Default Workspace</Label>
                      </div>
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

export default EditWorkspaceDialog;
