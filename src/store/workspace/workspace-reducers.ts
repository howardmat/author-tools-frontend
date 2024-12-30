import { DEFAULT_WORKSPACE_ID } from '@/lib/constants';
import { WorkspaceActionTypes, WorkspaceActions } from '../../actions';
import { IWorkspace } from '@/types';

export type State = {
  workspace: IWorkspace;
};

export const initialState: State = {
  workspace: {
    id: DEFAULT_WORKSPACE_ID,
    name: 'Default Workspace',
    icon: 'arrow-right',
  },
};

export function reducer(state: State, action: WorkspaceActions) {
  switch (action.type) {
    case WorkspaceActionTypes.SET_ACTIVE_WORKSPACE:
      return {
        workspace: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
