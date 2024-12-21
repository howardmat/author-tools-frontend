import { DragEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';
import { IEntity } from '../../types';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
const API_URL = import.meta.env.VITE_API_URL;

const EntityList: React.FC<{
  entities: IEntity[];
  onDelete: (event: MouseEvent<HTMLDivElement>, id: string) => void;
  onDragStart: (event: DragEvent<HTMLLIElement>) => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onDragEnd: () => void;
}> = ({ entities, onDelete, onDragStart, onDragOver, onDragEnd }) => {
  const navigate = useNavigate();

  const handleListClick = (id: string | undefined) => {
    navigate(`${id}/edit`);
  };

  return (
    <>
      <ul role='list' className='divide-y divide-accent-background'>
        {entities.map((c) => (
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
                <p className='font-semibold'>{c.name}</p>
              </div>
            </div>
            <div className='flex shrink-0 items-center gap-x-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost'>
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuItem
                    className='flex justify-between'
                    onClick={(event) => onDelete(event, c.id || '')}
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
    </>
  );
};

export default EntityList;
