import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { usePostFileMutation } from '@/http';
import { FormField } from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import styles from './avatar-upload.module.css';
import EditOverlay from '../common/edit-overlay';

const API_URL = import.meta.env.VITE_API_URL;

interface IAvatarUploadProps {
  name: string;
}

export default function AvatarUpload({ name }: IAvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext();
  const [fileId, setFileId] = useState<string | undefined>(
    form.getValues(name)
  );

  const { mutate, isPending } = usePostFileMutation({
    onSuccess: async (fileId: string | undefined) => {
      if (fileId) {
        setFileId(fileId);
        form.setValue(name, fileId);
      }
    },
    onError: (error: Error) => {
      toast.error('Oops!', {
        description: error?.message ?? 'An unexpected error occurred',
      });
    },
  });

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      mutate(formData);
    }
  };

  let avatarContent = <UserCircleIcon aria-hidden='true' viewBox='2 2 16 16' />;

  if (fileId) {
    avatarContent = (
      <img
        alt=''
        src={`${API_URL}/file/${fileId}`}
        className='w-24 rounded-full'
      />
    );
  }

  let finalAvatarPreviewContent = (
    <div className='relative inline-block w-24' onClick={handleClick}>
      {avatarContent}
      <EditOverlay className='rounded-full' />
    </div>
  );

  if (isPending) {
    finalAvatarPreviewContent = (
      <LoaderCircle className={`${styles.spin} w-24 h-24 text-gray-300`} />
    );
  }

  return (
    <div className='flex justify-center items-center gap-x-3'>
      {finalAvatarPreviewContent}
      <input
        className='hidden'
        type='file'
        onChange={handleChange}
        ref={fileInputRef}
      />
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => <Input className='hidden' {...field} />}
      />
    </div>
  );
}
