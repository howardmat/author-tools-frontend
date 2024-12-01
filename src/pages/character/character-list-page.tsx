import PageHeading from '../../components/page-heading';
import CharacterList from '../../components/character/character-list';
import { useGetCharactersQuery, usePatchCharacterMutation } from '@/http';
import EmptyPageContent from '@/components/empty-page-content';
import LoadingIndicator from '@/components/loading-indicator';
import { ActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { DragEvent, useEffect, useRef, useState } from 'react';
import { Character } from '@/types';
import { toast } from '@/hooks/use-toast';

const CharacterListPage: React.FC = () => {
  const { data, isPending, isError, error } = useGetCharactersQuery();
  const { dispatch } = useBreadcrumbContext();
  const [state, setState] = useState<Character[]>([]);
  const dragItemId = useRef<string | undefined>();
  const dragOverItemId = useRef<string | undefined>();

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: ActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [
        {
          name: 'Characters',
          url: '/characters',
        },
      ],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    if (dragOverItemId.current !== event.currentTarget.id) {
      dragOverItemId.current = event.currentTarget.id;

      const charactersCopy = [...state];

      const dragCharacterIndex = charactersCopy.findIndex(
        (c) => c?.id === dragItemId.current
      );
      const dragCharacter = charactersCopy[dragCharacterIndex];

      const dragOverCharacterIndex = charactersCopy.findIndex(
        (c) => c?.id === dragOverItemId.current
      );

      charactersCopy.splice(dragCharacterIndex, 1);
      charactersCopy.splice(dragOverCharacterIndex, 0, dragCharacter);

      setState(charactersCopy);
    }
  };

  const handleDragEnd = () => {
    const charactersCopy = [...state];

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

  let content = (
    <EmptyPageContent
      title='Nothing&lsquo;s here yet!'
      description='Get started by creating a new character.'
      actionLabel='New Character'
      actionRoute='/characters/add'
      className='mt-8'
    />
  );

  if (state && state.length > 0) {
    content = (
      <CharacterList
        characters={state}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      />
    );
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
