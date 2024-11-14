import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { Character } from '@/types';
import { API_URL, QUERY_KEYS } from '../util/constants';
import { queryClient } from '@/http/query-client';

const CHARACTER_ENDPOINT = `${API_URL}/characters`;
const FILE_ENDPOINT = `${API_URL}/file`;

const JWT_TEMPLATE = 'author-tools-jwt';

interface AuthenticatedParams {
  token?: string;
}
/* Characters */
interface GetCharactersParams extends AuthenticatedParams {
  signal: AbortSignal;
}
interface GetCharacterParams extends AuthenticatedParams {
  id: string;
  signal: AbortSignal;
}
interface PostCharacterParams extends AuthenticatedParams {
  character: Character;
}
interface PutCharacterParams extends AuthenticatedParams {
  id: string;
  character: Character;
}

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

export function usePostCharacterMutation() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (character: Character) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postCharacter({ character, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
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

export function usePutCharacterMutation() {
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
      console.log(error);
      queryClient.setQueryData([QUERY_KEYS.CHARACTERS, variables.id], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHARACTERS],
      });
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

/* Files */
export function usePostFileMutation({
  onSettled,
}: {
  onSettled: (fileId: string | undefined) => void;
}) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postFile({ formData, token });
    },
    onSettled: onSettled,
  });
}

export async function postFile({
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
