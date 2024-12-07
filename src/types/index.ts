export interface CodeValue {
  code: string;
  value: string;
}

export interface Attribute {
  label: string | null;
  value: string | null;
}

export interface DetailSection {
  title: string | null;
  type: 'attribute' | 'note' | null;
  noteContent: string | null;
  attributes: Attribute[];
}

export interface Character {
  id?: string;
  name: string;
  imageFileId: string;
  order?: number;
  detailSections: DetailSection[];
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

export interface UseMutationCallbacksWithParams<T> {
  onSuccess?: (data: T) => void;
  onError?: (error?: Error) => void;
}
export interface UseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
}
