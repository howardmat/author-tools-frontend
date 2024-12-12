import { IBreadcrumb } from '../types';

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
  SET_USERSETTINGS_THEME = 'SET_USERSETTINGS_THEME',
}

export type SetUserSettingsThemeAction = {
  type: UserSettingsActionTypes.SET_USERSETTINGS_THEME;
  payload: string;
};

export type UserSettingsActions = SetUserSettingsThemeAction;
