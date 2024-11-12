import PageHeading from '../../components/page-heading';
import CharacterList from '../../components/character/character-list';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/http';
import { QUERY_KEYS } from '@/util/constants';

const CharacterListPage: React.FC = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS],
    queryFn: getCharacters,
  });

  let content;

  if (isPending) {
    content = <p className='text-center'>Loading...</p>;
  }
  if (isError) {
    content = (
      <>
        <p className='text-center text-red-500'>
          Error! {error.message || 'An error has occurred'}
        </p>
      </>
    );
  }
  if (data) {
    content = <CharacterList characters={data} />;
  }

  return (
    <>
      <PageHeading title='Characters' addRoute='/characters/add' />
      {content}
    </>
  );
};

export default CharacterListPage;
