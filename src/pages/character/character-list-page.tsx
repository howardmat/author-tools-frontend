import PageHeading from '../../components/page-heading';
import CharacterList from '../../components/character/character-list';
import { useGetCharactersQuery } from '@/http';
import EmptyPageContent from '@/components/empty-page-content';
import LoadingIndicator from '@/components/loading-indicator';

const CharacterListPage: React.FC = () => {
  const { data, isPending, isError, error } = useGetCharactersQuery();

  let content = (
    <EmptyPageContent
      title='Nothing&lsquo;s here yet!'
      description='Get started by creating a new character.'
      actionLabel='New Character'
      actionRoute='/characters/add'
      className='mt-8'
    />
  );

  if (data && data.length > 0) {
    content = <CharacterList characters={data} />;
  }

  if (isPending) {
    content = <LoadingIndicator />;
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

  return (
    <>
      <PageHeading title='Characters' addRoute='/characters/add' />
      {content}
    </>
  );
};

export default CharacterListPage;
