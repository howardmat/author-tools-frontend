import { useForm } from 'react-hook-form';
import { Character, CharacterFormData } from '../../types';
import TextBox from '../controls/TextBox';

const CharacterForm: React.FC<{
  character?: Character | null;
  onSave: (data: CharacterFormData) => void;
}> = ({ character, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CharacterFormData>({
    defaultValues: {
      firstName: character?.firstName,
      lastName: character?.lastName,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>Profile</h2>
          <p className='mt-1 text-sm/6 text-gray-600'>
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            Personal Information
          </h2>
          <p className='mt-1 text-sm/6 text-gray-600'>
            Use a permanent address where you can receive mail.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <TextBox
                id='firstName'
                error={errors.firstName ? 'Invalid value' : undefined}
                {...register('firstName', {
                  required: true,
                  maxLength: 100,
                })}
              >
                First name
              </TextBox>
            </div>

            <div className='sm:col-span-3'>
              <TextBox
                id='lastName'
                error={errors.lastName ? 'Invalid value' : undefined}
                {...register('lastName', {
                  required: true,
                  maxLength: 100,
                })}
              >
                Last name
              </TextBox>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='button' className='text-sm/6 font-semibold text-gray-900'>
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
