import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import {
  ICharacter,
  IDeleteCharacterParams,
  IGetCharacterParams,
  IGetCharactersParams,
  IPostCharacterParams,
  IPutCharacterParams,
  IPatchCharacterParams,
  IUseMutationCallbacks,
  IPatchRequest,
  IUseMutationCallbacksWithParams,
} from '@/types';
import { queryClient } from '@/http/query-client';
import { QUERY_KEYS } from '../lib/constants';

const API_URL = import.meta.env.VITE_API_URL;

const CHARACTER_ENDPOINT = `${API_URL}/characters`;
const FILE_ENDPOINT = `${API_URL}/file`;
const JWT_TEMPLATE = 'author-tools-jwt';

export function useGetCharactersQuery() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getCharacters({ signal, token });
    },
  });
}

async function getCharacters({
  signal,
  token,
}: IGetCharactersParams): Promise<ICharacter[]> {
  const response = await fetch(CHARACTER_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as ICharacter[];
}

export function useGetCharacterQuery(id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS, id],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getCharacter({ id: id, signal, token });
    },
  });
}

async function getCharacter({
  id,
  signal,
  token,
}: IGetCharacterParams): Promise<ICharacter> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as ICharacter;
}

export function usePostCharacterMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<ICharacter>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (character: ICharacter) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postCharacter({ character, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
      if (onSuccess) onSuccess(data);
    },
  });
}

async function postCharacter({
  character,
  token,
}: IPostCharacterParams): Promise<ICharacter> {
  const response = await fetch(CHARACTER_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(character),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the character');
    throw error;
  }

  return await response.json();
}

export function usePutCharacterMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<ICharacter>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      character,
      id,
    }: {
      character: ICharacter;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putCharacter({ id, character, token });
    },
    onMutate: async (data: IPutCharacterParams) => {
      const character = data.character;
      const id = data.id;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.CHARACTERS, id],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.CHARACTERS,
        id,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CHARACTERS, id], character);

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.CHARACTERS, variables.id], context);

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHARACTERS],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}

async function putCharacter({
  id,
  character,
  token,
}: IPutCharacterParams): Promise<ICharacter> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(character),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the character');
    throw error;
  }

  return await response.json();
}

export function usePatchCharacterMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacks) {
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
      return await patchCharacter({ id, patchRequests, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });
}

async function patchCharacter({
  id,
  patchRequests,
  token,
}: IPatchCharacterParams): Promise<ICharacter> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patchRequests),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while partially updating the character'
    );
    throw error;
  }

  return await response.json();
}

export function useDeleteCharacterMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacks) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      await deleteCharacter({ id, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
      if (onSuccess) onSuccess();
    },
  });
}

async function deleteCharacter({ id, token }: IDeleteCharacterParams) {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the character');
    throw error;
  }
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
  const response = await fetch(FILE_ENDPOINT, {
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
