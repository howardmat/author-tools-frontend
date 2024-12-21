import { DragEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import PageHeading from '../../components/common/page-heading';
import EntityList from '../../components/entity/entity-list';
import EmptyPageContent from '@/components/common/empty-page-content';
import LoadingIndicator from '@/components/common/loading-indicator';
import { BreadcrumbActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { EntityQueryType, IEntity } from '@/types';
import { toast } from '@/hooks/use-toast';
import ConfirmAlert, { IConfirmAlert } from '@/components/common/confirm-alert';
import {
  useDeleteEntityMutation,
  useGetEntitiesQuery,
  usePatchEntityMutation,
} from '@/hooks/use-entity-query';

const CharacterListPage: React.FC = () => {
  const { data, isPending, isError, error } = useGetEntitiesQuery(
    EntityQueryType.character
  );
  const { dispatch } = useBreadcrumbContext();
  const [state, setState] = useState<IEntity[]>([]);
  const dragItemId = useRef<string | undefined>();
  const dragOverItemId = useRef<string | undefined>();

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
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

  const { mutate } = useDeleteEntityMutation(EntityQueryType.character, {
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
  const handleDelete = (event: MouseEvent<HTMLDivElement>, id: string) => {
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

  const { mutate: patchMutate } = usePatchEntityMutation(
    EntityQueryType.character,
    {
      onError: (error?: Error) => {
        toast({
          title: 'Error!',
          description:
            error?.message ??
            'An unexpected error occurred while updating the order',
          variant: 'destructive',
        });
      },
    }
  );

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
              path: 'order',
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
      <EntityList
        entities={state}
        onDelete={handleDelete}
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
      <ConfirmAlert ref={alertRef} />
    </>
  );
};

export default CharacterListPage;
