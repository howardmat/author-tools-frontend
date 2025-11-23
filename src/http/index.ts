import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import {
  IEntity,
  IDeleteEntityParams,
  IGetEntityParams,
  IPostEntityParams,
  IPutEntityParams,
  IPatchEntityParams,
  IUseMutationCallbacksWithParams,
  IUserSetting,
  IGetUserSettingParams,
  IPostUserSettingParams,
  IPutUserSettingParams,
  IGetEntitiesParams,
  EntityQueryType,
  IWorkspace,
  IGetWorkspacesParams,
  IPostWorkspaceParams,
  IPutWorkspaceParams,
  IDeleteWorkspaceParams,
} from '@/types';
import { queryClient } from '@/http/query-client';
import { API_ENDPOINTS, JWT_TEMPLATE, QUERY_KEYS } from '../lib/constants';

/* Common Entities */
export async function getEntities({
  type,
  workspaceId,
  signal,
  token,
}: IGetEntitiesParams): Promise<IEntity[]> {
  const response = await fetch(
    getEntityEndpointByQueryType(type) +
      '?' +
      new URLSearchParams({
        workspaceId,
      }),
    {
      headers: { Authorization: `Bearer ${token}` },
      signal: signal,
    }
  );

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data');
    throw error;
  }

  return (await response.json()) as IEntity[];
}

export async function getEntity({
  type,
  id,
  signal,
  token,
}: IGetEntityParams): Promise<IEntity> {
  const response = await fetch(getEntityEndpointByQueryType(type) + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data');
    throw error;
  }

  return (await response.json()) as IEntity;
}

export async function postEntity({
  type,
  entity,
  token,
}: IPostEntityParams): Promise<IEntity> {
  const response = await fetch(getEntityEndpointByQueryType(type), {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the record');
    throw error;
  }

  return await response.json();
}

export async function putEntity({
  type,
  id,
  entity,
  token,
}: IPutEntityParams): Promise<IEntity> {
  const response = await fetch(getEntityEndpointByQueryType(type) + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(entity),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the record');
    throw error;
  }

  return await response.json();
}

export async function patchEntity({
  type,
  id,
  patchRequests,
  token,
}: IPatchEntityParams): Promise<void> {
  const response = await fetch(getEntityEndpointByQueryType(type) + `/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patchRequests),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while partially updating the record'
    );
    throw error;
  }
}

export async function deleteEntity({ type, id, token }: IDeleteEntityParams) {
  const response = await fetch(getEntityEndpointByQueryType(type) + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the record');
    throw error;
  }
}

const getEntityEndpointByQueryType = (type: EntityQueryType) => {
  switch (type) {
    case EntityQueryType.character:
      return API_ENDPOINTS.CHARACTERS;
    case EntityQueryType.location:
      return API_ENDPOINTS.LOCATIONS;
    case EntityQueryType.creature:
      return API_ENDPOINTS.CREATURES;
    default:
      throw new Error(`Invalid type [${type}]`);
  }
};

/* User Settings */
export function useGetUserSettingQuery() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.USER_SETTINGS, userId],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getUserSetting({ signal, token });
    },
  });
}

async function getUserSetting({
  signal,
  token,
}: IGetUserSettingParams): Promise<IUserSetting> {
  const response = await fetch(API_ENDPOINTS.USER_SETTINGS, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while fetching the user settings'
    );
    throw error;
  }

  return (await response.json()) as IUserSetting;
}

export function usePostUserSettingMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IUserSetting>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (userSetting: IUserSetting) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postUserSetting({ userSetting, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_SETTINGS] });
      if (onSuccess) onSuccess(data);
    },
  });
}

async function postUserSetting({
  userSetting,
  token,
}: IPostUserSettingParams): Promise<IUserSetting> {
  const response = await fetch(API_ENDPOINTS.USER_SETTINGS, {
    method: 'POST',
    body: JSON.stringify(userSetting),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while creating the user setting'
    );
    throw error;
  }

  return await response.json();
}

export function usePutUserSettingMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IUserSetting>) {
  const { getToken, userId } = useAuth();

  return useMutation({
    mutationFn: async ({
      userSetting,
      id,
    }: {
      userSetting: IUserSetting;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putUserSetting({ id, userSetting, token });
    },
    onMutate: async (data: IPutUserSettingParams) => {
      const userSetting = data.userSetting;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.USER_SETTINGS, userId],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.USER_SETTINGS,
        userId,
      ]);
      queryClient.setQueryData([QUERY_KEYS.USER_SETTINGS, userId], userSetting);

      return { previousData };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.USER_SETTINGS, userId], context);

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_SETTINGS],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}

async function putUserSetting({
  id,
  userSetting,
  token,
}: IPutUserSettingParams): Promise<IUserSetting> {
  const response = await fetch(API_ENDPOINTS.USER_SETTINGS + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userSetting),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while updating the user settings'
    );
    throw error;
  }

  return await response.json();
}

/* Workspaces */
export function useGetWorkspacesQuery() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.WORKSPACES, userId],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getWorkspaces({ signal, token });
    },
  });
}

async function getWorkspaces({
  signal,
  token,
}: IGetWorkspacesParams): Promise<IWorkspace[]> {
  const response = await fetch(API_ENDPOINTS.WORKSPACE, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the workspaces');
    throw error;
  }

  return (await response.json()) as IWorkspace[];
}

export function usePostWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IWorkspace>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (workspace: IWorkspace) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postWorkspace({ workspace, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACES] });
      if (onSuccess) onSuccess(data);
    },
  });
}

async function postWorkspace({
  workspace,
  token,
}: IPostWorkspaceParams): Promise<IWorkspace> {
  const response = await fetch(API_ENDPOINTS.WORKSPACE, {
    method: 'POST',
    body: JSON.stringify(workspace),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the workspace');
    throw error;
  }

  return await response.json();
}

export function usePutWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IWorkspace>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      workspace,
      id,
    }: {
      workspace: IWorkspace;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putWorkspace({ id, workspace, token });
    },
    onMutate: async (data: IPutWorkspaceParams) => {
      const workspace = data.workspace;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.WORKSPACES, workspace.id],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.WORKSPACES,
        workspace.id,
      ]);
      queryClient.setQueryData(
        [QUERY_KEYS.WORKSPACES, workspace.id],
        workspace
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.WORKSPACES, variables.id], context);

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACES],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}

async function putWorkspace({
  id,
  workspace,
  token,
}: IPutWorkspaceParams): Promise<IWorkspace> {
  const response = await fetch(API_ENDPOINTS.WORKSPACE + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(workspace),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the workspace');
    throw error;
  }

  return await response.json();
}

export function useDeleteWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<string>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      await deleteWorkspace({ id, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACES] });
      if (onSuccess) onSuccess(variables);
    },
  });
}

async function deleteWorkspace({ id, token }: IDeleteWorkspaceParams) {
  const response = await fetch(API_ENDPOINTS.WORKSPACE + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the workspace');

    if (response.status === 400) {
      const responseJson = await response.json();
      switch (responseJson.error) {
        case 'WORKSPACE_ASSOCIATED_DATA_EXISTS':
          error.message = "This workspace has data saved and can't be deleted";
          break;
        case 'WORKSPACE_IS_LAST':
          error.message = "This is the only workspace and can't be deleted";
          break;
        default:
          break;
      }
    }

    throw error;
  }
}

export function invalidateEntityQueries(workspaceId: string) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.CHARACTERS, workspaceId],
  });
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.CREATURES, workspaceId],
  });
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.LOCATIONS, workspaceId],
  });
}

/* Files */
export function usePostFileMutation({
  onSuccess,
  onError,
}: {
  onSuccess: (fileId: string | undefined) => void;
  onError: (error: Error) => void;
}) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postFile({ formData, token });
    },
    onSuccess: onSuccess,
    onError: onError,
  });
}

async function postFile({
  formData,
  token,
}: {
  formData: FormData;
  token: string;
}): Promise<string> {
  const response = await fetch(API_ENDPOINTS.FILE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while sending the file');
    throw error;
  }

  return (await response.text()) as string;
}
