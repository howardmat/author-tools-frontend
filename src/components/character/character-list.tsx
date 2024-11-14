import { format } from 'date-fns';
import { Character } from '../../types';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { API_URL } from '@/util/constants';
import { useNavigate } from 'react-router-dom';

const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const navigate = useNavigate();

  const handleListClick = (id: string | undefined) => {
    navigate(`${id}/edit`);
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
              <img
                alt=''
                src={`${API_URL}/file/${c.imageFileId}`}
                className='h-12 w-12 flex-none rounded-full bg-gray-50'
              />
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
              <ChevronRightIcon
                aria-hidden='true'
                className='h-5 w-5 flex-none text-gray-400'
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CharacterList;
