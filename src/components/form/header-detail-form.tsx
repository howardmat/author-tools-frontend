import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AvatarUpload from './avatar-upload';
import EditNameHeader from './edit-name-header';

interface IHeaderFormProps {
  data?: HeaderFormData | null;
  onSave: (data: HeaderFormData) => void;
  isLoading?: boolean;
}

export class HeaderFormData {
  name: string;
  imageFileId: string;

  constructor() {
    this.name = '';
    this.imageFileId = '';
  }
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is a required field',
  }),
  imageFileId: z.string(),
});

export default function HeaderDetailForm({
  data,
  onSave,
  isLoading,
}: IHeaderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          ...data,
        }
      : new HeaderFormData(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as HeaderFormData);
  }

  function handleNameSave() {
    form.handleSubmit(onSubmit)();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='my-4 lg:flex lg:content-stretch gap-8 h-full'>
          <AvatarUpload name='imageFileId' />
          <EditNameHeader
            name='name'
            onNameSave={handleNameSave}
            isSaving={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
