import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import {
  Character,
  DeleteCharacterParams,
  GetCharacterParams,
  GetCharactersParams,
  PostCharacterParams,
  PutCharacterParams,
  UseMutationCallbacks,
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
}: GetCharactersParams): Promise<Character[]> {
  const response = await fetch(CHARACTER_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as Character[];
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
}: GetCharacterParams): Promise<Character> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as Character;
}

export function usePostCharacterMutation({
  onSuccess,
  onError,
}: UseMutationCallbacks) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (character: Character) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postCharacter({ character, token });
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

async function postCharacter({
  character,
  token,
}: PostCharacterParams): Promise<Character> {
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
}: UseMutationCallbacks) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      character,
      id,
    }: {
      character: Character;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putCharacter({ id, character, token });
    },
    onMutate: async (data: PutCharacterParams) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHARACTERS],
      });

      if (onSuccess) onSuccess();
    },
  });
}

async function putCharacter({
  id,
  character,
  token,
}: PutCharacterParams): Promise<Character> {
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

export function useDeleteCharacterMutation({
  onSuccess,
  onError,
}: UseMutationCallbacks) {
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

async function deleteCharacter({ id, token }: DeleteCharacterParams) {
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
