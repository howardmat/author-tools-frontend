import { PropsWithChildren, useEffect, useReducer } from 'react';
import WorkspaceContext from './workspace-context';
import { initialState, reducer } from './workspace-reducers';
import { useGetWorkspacesQuery } from '@/hooks/use-workspace-query';
import { useWorkspacePersistence } from '@/hooks/use-workspace-persistence';
import {
  BreadcrumbActionTypes,
  SetActiveWorkspaceAction,
  SetBreadcrumbWorkspaceAction,
  WorkspaceActionTypes,
} from '@/actions';
import { useBreadcrumbContext } from '../breadcrumb/use-breadcrumb-context';
import { IWorkspace } from '@/types';

const WorkspaceContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loadWorkspaceId, clearWorkspace } = useWorkspacePersistence();
  const { data: workspaces, isSuccess } = useGetWorkspacesQuery();
  const { dispatch: breadcrumbDispatch } = useBreadcrumbContext();

  const setInitialWorkspace = (workspace: IWorkspace) => {
    const setActiveWorkspaceAction: SetActiveWorkspaceAction = {
      type: WorkspaceActionTypes.SET_ACTIVE_WORKSPACE,
      payload: {
        ...workspace,
      },
    };
    dispatch(setActiveWorkspaceAction);

    const setBreadcrumbWorkspaceAction: SetBreadcrumbWorkspaceAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_WORKSPACE,
      payload: workspace.name,
    };
    breadcrumbDispatch(setBreadcrumbWorkspaceAction);
  };

  useEffect(() => {
    if (isSuccess && workspaces) {
      let workspaceIsSet = false;

      const savedWorkspaceId = loadWorkspaceId();
      if (savedWorkspaceId) {
        const savedWorkspace = workspaces.find(
          (w) => w.id === savedWorkspaceId
        );
        if (savedWorkspace) {
          setInitialWorkspace(savedWorkspace);
          workspaceIsSet = true;
        } else {
          clearWorkspace();
        }
      }

      if (!workspaceIsSet) {
        const defaultWorkspace = workspaces.find((w) => w.isDefault === true);
        if (defaultWorkspace) {
          setInitialWorkspace(defaultWorkspace);
        } else {
          const firstWorkspace = workspaces[0];
          setInitialWorkspace(firstWorkspace);
        }
      }
    }
  }, [isSuccess, workspaces]);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
