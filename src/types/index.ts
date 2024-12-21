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

export interface IEntity {
  id?: string;
  name: string;
  imageFileId: string;
  order?: number;
  detailSections: IDetailSection[];
}

export enum EntityQueryType {
  character,
  creature,
  location,
}

export interface IUserSetting {
  id?: string;
  theme?: string;
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
export interface IGetEntitiesParams extends IAuthenticatedParams {
  type: EntityQueryType;
  signal: AbortSignal;
}
export interface IGetEntityParams extends IAuthenticatedParams {
  type: EntityQueryType;
  id: string;
  signal: AbortSignal;
}
export interface IPostEntityParams extends IAuthenticatedParams {
  type: EntityQueryType;
  entity: IEntity;
}
export interface IPutEntityParams extends IAuthenticatedParams {
  type: EntityQueryType;
  id: string;
  entity: IEntity;
}
export interface IPatchEntityParams extends IAuthenticatedParams {
  type: EntityQueryType;
  id: string;
  patchRequests: IPatchRequest[];
}
export interface IDeleteEntityParams extends IAuthenticatedParams {
  type: EntityQueryType;
  id: string;
}

export interface IGetUserSettingParams extends IAuthenticatedParams {
  signal: AbortSignal;
}
export interface IPostUserSettingParams extends IAuthenticatedParams {
  userSetting: IUserSetting;
}
export interface IPutUserSettingParams extends IAuthenticatedParams {
  id: string;
  userSetting: IUserSetting;
}

export interface IUseMutationCallbacksWithParams<T> {
  onSuccess?: (data: T) => void;
  onError?: (error?: Error) => void;
}
export interface IUseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
}
export interface IMutateEntityParams {
  id: string;
  entity: IEntity;
}
