import { useForm } from 'react-hook-form';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Character, CharacterFormData } from '../../types';
import TextBox from '../controls/TextBox';
import Card from '../Card';

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
      <div className='sm:float-left'>
        <Card className='w-full sm:w-64 mt-8'>
          <div className='flex justify-center items-center gap-x-3'>
            <UserCircleIcon aria-hidden='true' className='w-48 text-gray-300' />
            <button
              type='button'
              className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            >
              Change
            </button>
          </div>
          <div className='mt-3 grid grid-cols-3 gap-x-6 gap-y-8'>
            <div className='col-span-3'>
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
            <div className='col-span-3'>
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
        </Card>
      </div>

      <div className='col-span-2 flex flex-wrap justify-evenly'>
        {/* <Card title='Personal Information' className='w-full sm:w-64 mt-8'>
          <p className='mt-1 text-sm/6 text-gray-600'>
            Use a permanent address where you can receive mail.
          </p>
          <div className='mt-10 grid grid-cols-3 gap-x-6 gap-y-8'>
            <div className='col-span-3'>
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
            <div className='col-span-3'>
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
        </Card>
        <Card title='Personal Information' className='w-full sm:w-64 mt-8'>
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
        </Card>
        <Card title='Personal Information' className='w-full sm:w-64 mt-8'>
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
        </Card>
        <Card title='Personal Information' className='w-full sm:w-64 mt-8'>
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
        </Card> */}
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
