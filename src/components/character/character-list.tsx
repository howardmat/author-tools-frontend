import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ChevronRightIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import { Character } from '../../types';
import ConfirmAlert, { IConfirmAlert } from '../confirm-alert';
import { MouseEvent, useRef } from 'react';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { useDeleteCharacterMutation } from '@/http';
const API_URL = import.meta.env.VITE_API_URL;

const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const navigate = useNavigate();

  const handleListClick = (id: string | undefined) => {
    navigate(`${id}/edit`);
  };

  const { mutate } = useDeleteCharacterMutation({
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Successfully deleted the character',
        variant: 'success',
      });
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });

  const alertRef = useRef<IConfirmAlert>(null);
  const handleDeleteClick = (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();

    if (alertRef.current) {
      alertRef.current.show({
        title: 'Are you sure?',
        description: 'This will permanently delete the character.',
        confirmLabel: 'Continue',
        declineLabel: 'Cancel',
        icon: 'question',
        variant: 'destructive',
        onConfirm: () => mutate(id),
      });
    }
  };

  return (
    <>
      <ul role='list' className='divide-y divide-gray-100'>
        {characters.map((c) => (
          <li
            onClick={() => handleListClick(c.id)}
            key={c.id}
            className='relative flex justify-between gap-x-6 py-5 cursor-pointer'
          >
            <div className='flex min-w-0 gap-x-4'>
              {c.imageFileId && (
                <img
                  alt=''
                  src={`${API_URL}/file/${c.imageFileId}`}
                  className='h-12 w-12 flex-none rounded-full bg-gray-50'
                />
              )}
              {!c.imageFileId && (
                <UserCircleIcon
                  aria-hidden='true'
                  className='w-12 h-12 text-gray-300'
                />
              )}
              <div className='min-w-0 flex-auto'>
                <p className='text-sm/6 font-semibold text-gray-900'>
                  {c.name}
                </p>
                <p className='mt-1 flex text-xs/5 text-gray-500'>
                  {c.alias ?? <span>{c.alias}</span>}
                </p>
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-x-4'>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                {c.archetype.value.length > 0 && (
                  <p className='text-sm/6 text-gray-900'>{c.archetype.value}</p>
                )}
                <p className='mt-1 text-xs/5 text-gray-500'>
                  {c.birthDate && (
                    <span>Born: {format(c.birthDate, 'MMMM d')}</span>
                  )}
                  {c.age && <span> | Age: {c.age}</span>}
                </p>
              </div>
              <Button
                variant='destructive'
                onClick={(event) => handleDeleteClick(event, c.id || '')}
              >
                <TrashIcon />
              </Button>
              <ChevronRightIcon
                aria-hidden='true'
                className='h-5 w-5 flex-none text-gray-400'
              />
            </div>
          </li>
        ))}
      </ul>
      <ConfirmAlert ref={alertRef} />
    </>
  );
};

export default CharacterList;
