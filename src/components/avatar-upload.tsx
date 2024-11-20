import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LoaderCircle, UserCircleIcon } from 'lucide-react';
import { usePostFileMutation } from '@/http';
import { FormField } from './ui/form';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import styles from './avatar-upload.module.css';

const API_URL = import.meta.env.VITE_API_URL;

interface AvatarUploadProps {
  name: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ name }) => {
  const { toast } = useToast();
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
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred',
        variant: 'destructive',
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

  let avatarPreviewContent = (
    <UserCircleIcon aria-hidden='true' className='w-48 h-24 text-gray-300' />
  );

  if (isPending) {
    avatarPreviewContent = (
      <LoaderCircle className={`${styles.spin} w-48 h-24 text-gray-300`} />
    );
  }

  if (fileId) {
    avatarPreviewContent = (
      <span className='relative inline-block'>
        <img
          alt=''
          src={`${API_URL}/file/${fileId}`}
          className='h-24 w-24 rounded-full'
        />
      </span>
    );
  }

  return (
    <div className='flex justify-center items-center gap-x-3'>
      {avatarPreviewContent}
      <button
        onClick={handleClick}
        type='button'
        className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
      >
        Change
      </button>
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
};

export default AvatarUpload;
