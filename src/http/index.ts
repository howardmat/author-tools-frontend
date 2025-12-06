import {
  IEntity,
  IDeleteEntityParams,
  IGetEntityParams,
  IPostEntityParams,
  IPutEntityParams,
  IPatchEntityParams,
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
  IGetWorkspaceParams,
} from '@/types';
import { API_ENDPOINTS } from '../lib/constants';

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
export async function getUserSetting({
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

export async function postUserSetting({
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

export async function putUserSetting({
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
export async function getWorkspaces({
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

export async function getWorkspace({
  id,
  signal,
  token,
}: IGetWorkspaceParams): Promise<IWorkspace> {
  const response = await fetch(API_ENDPOINTS.WORKSPACE + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the workspaces');
    throw error;
  }

  return (await response.json()) as IWorkspace;
}

export async function postWorkspace({
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

export async function putWorkspace({
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

export async function deleteWorkspace({ id, token }: IDeleteWorkspaceParams) {
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

/* Files */
export async function postFile({
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
