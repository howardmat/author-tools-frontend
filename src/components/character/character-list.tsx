import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  TrashIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';
import { Character } from '../../types';
import ConfirmAlert, { IConfirmAlert } from '../confirm-alert';
import { DragEvent, MouseEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { useDeleteCharacterMutation, usePatchCharacterMutation } from '@/http';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
const API_URL = import.meta.env.VITE_API_URL;

const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const navigate = useNavigate();
  const [charactersState, setCharactersState] =
    useState<Character[]>(characters);
  const dragItemId = useRef<string | undefined>();
  const dragOverItemId = useRef<string | undefined>();

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

  const { mutate: patchMutate } = usePatchCharacterMutation({
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description:
          error?.message ??
          'An unexpected error occurred while updating the order',
        variant: 'destructive',
      });
    },
  });

  const handleDragStart = (event: DragEvent<HTMLLIElement>) => {
    dragItemId.current = event.currentTarget.id;
  };

  const handleDragEnter = (event: DragEvent<HTMLLIElement>) => {
    dragOverItemId.current = event.currentTarget.id;

    const charactersCopy = [...charactersState];

    const dragCharacterIndex = charactersCopy.findIndex(
      (c) => c?.id === dragItemId.current
    );
    const dragCharacter = charactersCopy[dragCharacterIndex];

    const dragOverCharacterIndex = charactersCopy.findIndex(
      (c) => c?.id === dragOverItemId.current
    );

    charactersCopy.splice(dragCharacterIndex, 1);
    charactersCopy.splice(dragOverCharacterIndex, 0, dragCharacter);

    setCharactersState(charactersCopy);
  };

  const handleDragEnd = () => {
    const charactersCopy = [...charactersState];

    charactersCopy.forEach((c, i) => {
      const updatedOrder = i + 1;
      if (c.order !== updatedOrder) {
        patchMutate({
          id: c.id || '',
          patchRequests: [
            {
              operation: 'update',
              path: '/order',
              value: updatedOrder,
            },
          ],
        });
      }
    });
  };

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
        {charactersState.map((c) => (
          <li
            draggable
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
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
                  className='h-16 flex-none rounded-full'
                />
              )}
              {!c.imageFileId && (
                <UserCircleIcon aria-hidden='true' className='h-16' />
              )}
              <div className='min-w-0 flex-auto'>
                <p className=' font-semibold text-primary'>{c.name}</p>
                <p className='mt-1 flex text-sm/6 text-secondary-foreground'>
                  {c.alias ?? <span>{c.alias}</span>}
                </p>
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-x-4'>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                {c.archetype.value.length > 0 && (
                  <p className=' text-primary'>{c.archetype.value}</p>
                )}
                <p className='mt-1 text-sm/6 text-secondary-foreground'>
                  {c.birthDate && (
                    <span>Born: {format(c.birthDate, 'MMMM d')}</span>
                  )}
                  {(c.age ?? 0) > 0 && <span> | Age: {c.age}</span>}
                </p>
              </div>

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
