import { IBreadcrumb, IUserSetting, IWorkspace } from '../types';

// Breadcrumb
export enum BreadcrumbActionTypes {
  SET_BREADCRUMB_WORKSPACE = 'SET_BREADCRUMB_WORKSPACE',
  SET_BREADCRUMB_TRAIL = 'SET_BREADCRUMB_TRAIL',
  ADD_BREADCRUMB_TRAIL = 'ADD_BREADCRUMB_TRAIL',
}

export type SetBreadcrumbWorkspaceAction = {
  type: BreadcrumbActionTypes.SET_BREADCRUMB_WORKSPACE;
  payload: string;
};

export type SetBreadcrumbTrailAction = {
  type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL;
  payload: IBreadcrumb[];
};

export type AddBreadcrumbTrailAction = {
  type: BreadcrumbActionTypes.ADD_BREADCRUMB_TRAIL;
  payload: IBreadcrumb;
};

export type BreadcrumbActions =
  | SetBreadcrumbWorkspaceAction
  | SetBreadcrumbTrailAction
  | AddBreadcrumbTrailAction;

// User Settings
export enum UserSettingsActionTypes {
  SET_USERSETTINGS = 'SET_USERSETTINGS',
}

export type SetUserSettingsAction = {
  type: UserSettingsActionTypes.SET_USERSETTINGS;
  payload: IUserSetting;
};

export type UserSettingsActions = SetUserSettingsAction;

// Workspace
export enum WorkspaceActionTypes {
  SET_ACTIVE_WORKSPACE = 'SET_ACTIVE_WORKSPACE',
}

export type SetActiveWorkspaceAction = {
  type: WorkspaceActionTypes.SET_ACTIVE_WORKSPACE;
  payload: IWorkspace;
};

export type WorkspaceActions = SetActiveWorkspaceAction;
