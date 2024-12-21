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
} from '@/types';
import { queryClient } from '@/http/query-client';
import { API_ENDPOINTS, JWT_TEMPLATE, QUERY_KEYS } from '../lib/constants';

/* Common Entities */
export async function getEntities({
  type,
  signal,
  token,
}: IGetEntitiesParams): Promise<IEntity[]> {
  const response = await fetch(getEntityEndpointByQueryType(type), {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

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
