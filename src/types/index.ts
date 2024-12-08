export interface ICodeValue {
  code: string;
  value: string;
}

export interface IAttribute {
  id: string;
  label: string | null;
  value: string | null;
}

export interface IDetailSection {
  id: string;
  title: string | null;
  type: 'attribute' | 'note' | null;
  noteContent: string | null;
  attributes: IAttribute[];
}

export interface ICharacter {
  id?: string;
  name: string;
  imageFileId: string;
  order?: number;
  detailSections: IDetailSection[];
}

export interface IBreadcrumbTrail {
  workspaceName: string;
  trail: IBreadcrumb[];
}
export interface IBreadcrumb {
  name: string;
  url?: string;
}
export interface IWorkspace {
  name: string;
  logo: React.ElementType;
  description: string;
}

export interface IPatchRequest {
  operation: 'update';
  path: string;
  value: unknown;
}

interface IAuthenticatedParams {
  token?: string;
}
export interface IGetCharactersParams extends IAuthenticatedParams {
  signal: AbortSignal;
}
export interface IGetCharacterParams extends IAuthenticatedParams {
  id: string;
  signal: AbortSignal;
}
export interface IPostCharacterParams extends IAuthenticatedParams {
  character: ICharacter;
}
export interface IPutCharacterParams extends IAuthenticatedParams {
  id: string;
  character: ICharacter;
}
export interface IPatchCharacterParams extends IAuthenticatedParams {
  id: string;
  patchRequests: IPatchRequest[];
}
export interface IDeleteCharacterParams extends IAuthenticatedParams {
  id: string;
}

export interface IUseMutationCallbacksWithParams<T> {
  onSuccess?: (data: T) => void;
  onError?: (error?: Error) => void;
}
export interface IUseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
}
