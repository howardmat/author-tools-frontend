import {
  IUseMutationCallbacks,
  IPatchRequest,
  EntityQueryType,
  IEntity,
  IUseMutationCallbacksWithParams,
  IMutateEntityParams,
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import {
  deleteEntity,
  getEntities,
  getEntity,
  patchEntity,
  postEntity,
  putEntity,
} from '@/http';
import { JWT_TEMPLATE, QUERY_KEYS } from '@/lib/constants';
import { queryClient } from '@/http/query-client';
import { useWorkspaceContext } from '@/store/workspace/use-workspace-context';

export function useGetEntitiesQuery(type: EntityQueryType) {
  const { getToken } = useAuth();
  const { state: workspaceState } = useWorkspaceContext();

  return useQuery({
    queryKey: [getKeyByQueryType(type), workspaceState.workspace.id],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getEntities({
        type,
        workspaceId: workspaceState.workspace.id,
        signal,
        token,
      });
    },
  });
}

export function useGetEntityQuery(type: EntityQueryType, id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [getKeyByQueryType(type), id],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getEntity({ type, id, signal, token });
    },
  });
}

export function usePostEntityMutation(
  type: EntityQueryType,
  { onSuccess, onError }: IUseMutationCallbacksWithParams<IEntity>
) {
  const { getToken } = useAuth();
  const { state: workspaceState } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (entity: IEntity) => {
      entity.workspaceId = workspaceState.workspace.id;

      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postEntity({ type, entity, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getKeyByQueryType(type)] });
      if (onSuccess) onSuccess(data);
    },
  });
}

export function usePutEntityMutation(
  type: EntityQueryType,
  { onSuccess, onError }: IUseMutationCallbacksWithParams<IEntity>
) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ entity, id }: { entity: IEntity; id: string }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putEntity({ type, id, entity, token });
    },
    onMutate: async (data: IMutateEntityParams) => {
      const entity = data.entity;
      const id = data.id;

      await queryClient.cancelQueries({
        queryKey: [getKeyByQueryType(type), id],
      });
      const previousData = queryClient.getQueryData([
        getKeyByQueryType(type),
        id,
      ]);
      queryClient.setQueryData([getKeyByQueryType(type), id], entity);

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [getKeyByQueryType(type), variables.id],
        context
      );

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getKeyByQueryType(type)],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}

export function usePatchEntityMutation(
  type: EntityQueryType,
  { onSuccess, onError }: IUseMutationCallbacks
) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      patchRequests,
      id,
    }: {
      patchRequests: IPatchRequest[];
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await patchEntity({ type, id, patchRequests, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });
}

export function useDeleteEntityMutation(
  type: EntityQueryType,
  { onSuccess, onError }: IUseMutationCallbacks
) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      await deleteEntity({ type, id, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKeyByQueryType(type)] });
      if (onSuccess) onSuccess();
    },
  });
}

const getKeyByQueryType = (type: EntityQueryType) => {
  switch (type) {
    case EntityQueryType.character:
      return QUERY_KEYS.CHARACTERS;
    case EntityQueryType.location:
      return QUERY_KEYS.LOCATIONS;
    case EntityQueryType.creature:
      return QUERY_KEYS.CREATURES;
    default:
      throw new Error(`Invalid type [${type}]`);
  }
};
