import { CharacterFormData } from '@/types';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AvatarUpload from '../avatar-upload';
import EditNameHeader from '../edit-name-header';
import EmptyPageContent from '../empty-page-content';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required for a Character.',
  }),
  imageFileId: z.string(),
});

const CharacterFormV2: React.FC<{
  character: CharacterFormData | null;
  onSave: (data: CharacterFormData) => void;
  onCancel?: () => void;
}> = ({ character, onSave }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...character,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as CharacterFormData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='my-4 md:flex md:content-stretch gap-8 h-full'>
          <AvatarUpload name='imageFileId' />
          <EditNameHeader name='name' />
        </div>
        {/* <div className='flex flex-1 flex-col gap-4'>
          <div className='grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            <div className='rounded-xl bg-muted/50 p-3'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center lg:text-left'>
                Personal Details
              </h4>
              <div className='my-4 px-2 grid grid-cols-2 gap-4 relative'>
                <span className='text-right font-semibold'>Name</span>
                <span className=''>John Doe</span>
              </div>
              <div className='my-4 px-2 grid grid-cols-2 gap-4'>
                <span className='text-right font-semibold'>Archetype</span>
                <span className=''>Hero</span>
              </div>
              <div className='my-4 px-2 grid grid-cols-2 gap-4'>
                <span className='text-right font-semibold'>Age</span>
                <span className=''>28</span>
              </div>
            </div>
          </div>
        </div> */}
        <div className='flex justify-center mt-16'>
          <EmptyPageContent
            title='Nothing&lsquo;s here yet!'
            description='Get started by entering a name above then click Save. Your character will be created and you can continue editing them.'
            className='mt-1 w-64'
          />
        </div>
      </form>
    </Form>
  );
};

export default CharacterFormV2;
