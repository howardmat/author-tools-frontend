import { Character } from '@/types';
import { API_URL } from '../util/constants';

const CHARACTER_ENDPOINT = `${API_URL}/characters`;
const FILE_ENDPOINT = `${API_URL}/file`;

/* Characters */
interface GetCharactersParams {
  signal: AbortSignal;
}
interface GetCharacterParams {
  id: string;
  signal: AbortSignal;
}
export interface PutCharacterParams {
  id: string;
  character: Character;
}

export async function getCharacters({
  signal,
}: GetCharactersParams): Promise<Character[]> {
  const response = await fetch(CHARACTER_ENDPOINT, { signal: signal });
  console.log(response);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as Character[];
}

export async function getCharacter({
  id,
  signal,
}: GetCharacterParams): Promise<Character> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the characters');
    throw error;
  }

  return (await response.json()) as Character;
}

export async function postCharacter(character: Character): Promise<Character> {
  const response = await fetch(CHARACTER_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(character),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the character');
    throw error;
  }

  return await response.json();
}

export async function putCharacter({
  id,
  character,
}: PutCharacterParams): Promise<Character> {
  const response = await fetch(CHARACTER_ENDPOINT + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(character),
    headers: {
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
export async function postFile(formData: FormData): Promise<string> {
  console.log(formData);
  const response = await fetch(FILE_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while sending the file');
    throw error;
  }

  return (await response.text()) as string;
}
