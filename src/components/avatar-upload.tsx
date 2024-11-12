import { useRef, useState } from 'react';
import { UserCircleIcon } from 'lucide-react';
import { API_URL } from '@/util/constants';
import { postFile } from '@/http';

import { useFormContext } from 'react-hook-form';
import { FormField } from './ui/form';
import { Input } from './ui/input';

interface AvatarUploadProps {
  name: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ name }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext();
  const [fileId, setFileId] = useState<string | undefined>(
    form.getValues(name)
  );

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      const fileId = await postFile(formData);

      if (fileId) {
        setFileId(fileId);
        form.setValue(name, fileId);
      }
    }
  };

  return (
    <div className='flex justify-center items-center gap-x-3'>
      {fileId && (
        <span className='relative inline-block'>
          <img
            alt=''
            src={`${API_URL}/file/${fileId}`}
            className='h-24 w-24 rounded-full'
          />
        </span>
      )}
      {!fileId && (
        <UserCircleIcon
          aria-hidden='true'
          className='w-48 h-24 text-gray-300'
        />
      )}
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
