import { useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';
import { Character } from '../../types';
import ConfirmAlert, { IConfirmAlert } from '../confirm-alert';
import { DragEvent, MouseEvent, useRef } from 'react';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { useDeleteCharacterMutation } from '@/http';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
const API_URL = import.meta.env.VITE_API_URL;

const CharacterList: React.FC<{
  characters: Character[];
  onDragStart: (event: DragEvent<HTMLLIElement>) => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onDragEnd: () => void;
}> = ({ characters, onDragStart, onDragOver, onDragEnd }) => {
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
  const handleDeleteClick = (event: MouseEvent<HTMLDivElement>, id: string) => {
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
      <ul role='list' className='divide-y divide-accent-background'>
        {characters.map((c) => (
          <li
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onClick={() => handleListClick(c.id)}
            key={c.id}
            id={c.id}
            className='relative flex justify-between gap-x-6 py-5 cursor-pointer'
          >
            <div className='flex min-w-0 items-center gap-x-4'>
              {c.imageFileId && (
                <img
                  alt=''
                  src={`${API_URL}/file/${c.imageFileId}`}
                  className='w-16 flex-none rounded-full'
                />
              )}
              {!c.imageFileId && (
                <UserCircleIcon aria-hidden='true' className='w-16' />
              )}
              <div className='min-w-0 flex-auto'>
                <p className=' font-semibold text-primary'>{c.name}</p>
                {/* <p className='mt-1 flex text-sm/6 text-secondary-foreground'>
                  {c.alias ?? <span>{c.alias}</span>}
                </p> */}
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-x-4'>
              {/* <div className='hidden sm:flex sm:flex-col sm:items-end'>
                {c.archetype.value.length > 0 && (
                  <p className=' text-primary'>{c.archetype.value}</p>
                )}
                <p className='mt-1 text-sm/6 text-secondary-foreground'>
                  {c.birthDate && (
                    <span>Born: {format(c.birthDate, 'MMMM d')}</span>
                  )}
                  {(c.age ?? 0) > 0 && <span> | Age: {c.age}</span>}
                </p>
              </div> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost'>
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuItem
                    className='flex justify-between'
                    onClick={(event) => handleDeleteClick(event, c.id || '')}
                  >
                    Delete
                    <TrashIcon className='text-destructive' />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmAlert ref={alertRef} />
    </>
  );
};

export default CharacterList;
