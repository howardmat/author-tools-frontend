interface CharacterRelationship {
  name: string;
  relationship: string;
}

export interface CodeValue {
  code: string;
  value: string;
}

export interface Character {
  id?: string;
  name: string;
  alias: string;
  archetype: CodeValue;
  imageFileId: string;
  birthDate?: string | null;
  age?: number;
  profession: string;
  loveInterest: string;
  gender: CodeValue;
  eyeColor: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  bodyShape: string;
  personalTraits: string;
  abilities: string;
  strength: string;
  weakness: string;
  friendsAndFamily: string;
  relationships: CharacterRelationship[];
  history: string;
  familyHistory: string;
  order?: number;
}

export class CharacterFormData {
  name: string;
  alias: string;
  archetype: string;
  imageFileId: string;
  birthDate?: Date;
  age?: number;
  profession: string;
  loveInterest: string;
  gender: string;
  eyeColor: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  bodyShape: string;
  personalTraits: string;
  abilities: string;
  strength: string;
  weakness: string;
  friendsAndFamily: string;
  relationships: CharacterRelationship[];
  history: string;
  familyHistory: string;

  constructor() {
    this.name = '';
    this.alias = '';
    this.archetype = '';
    this.imageFileId = '';
    this.age = 0;
    this.profession = '';
    this.loveInterest = '';
    this.gender = '';
    this.eyeColor = '';
    this.hairType = '';
    this.hairColor = '';
    this.hairLength = '';
    this.bodyShape = '';
    this.personalTraits = '';
    this.abilities = '';
    this.strength = '';
    this.weakness = '';
    this.friendsAndFamily = '';
    this.relationships = [];
    this.history = '';
    this.familyHistory = '';
  }
}

export interface BreadcrumbTrail {
  workspaceName: string;
  trail: Breadcrumb[];
}
export interface Breadcrumb {
  name: string;
  url?: string;
}
export interface Workspace {
  name: string;
  logo: React.ElementType;
  description: string;
}

export interface PatchRequest {
  operation: 'update';
  path: string;
  value: unknown;
}

interface AuthenticatedParams {
  token?: string;
}
export interface GetCharactersParams extends AuthenticatedParams {
  signal: AbortSignal;
}
export interface GetCharacterParams extends AuthenticatedParams {
  id: string;
  signal: AbortSignal;
}
export interface PostCharacterParams extends AuthenticatedParams {
  character: Character;
}
export interface PutCharacterParams extends AuthenticatedParams {
  id: string;
  character: Character;
}
export interface PatchCharacterParams extends AuthenticatedParams {
  id: string;
  patchRequests: PatchRequest[];
}
export interface DeleteCharacterParams extends AuthenticatedParams {
  id: string;
}

export interface UseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
}
