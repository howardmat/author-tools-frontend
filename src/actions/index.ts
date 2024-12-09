import { IBreadcrumb } from '../types';

export enum ActionTypes {
  SET_BREADCRUMB_WORKSPACE = 'SET_BREADCRUMB_WORKSPACE',
  SET_BREADCRUMB_TRAIL = 'SET_BREADCRUMB_TRAIL',
  ADD_BREADCRUMB_TRAIL = 'ADD_BREADCRUMB_TRAIL',
}

export type SetBreadcrumbWorkspaceAction = {
  type: ActionTypes.SET_BREADCRUMB_WORKSPACE;
  payload: string;
};

export type SetBreadcrumbTrailAction = {
  type: ActionTypes.SET_BREADCRUMB_TRAIL;
  payload: IBreadcrumb[];
};

export type AddBreadcrumbTrailAction = {
  type: ActionTypes.ADD_BREADCRUMB_TRAIL;
  payload: IBreadcrumb;
};

export type Actions =
  | SetBreadcrumbWorkspaceAction
  | SetBreadcrumbTrailAction
  | AddBreadcrumbTrailAction;
