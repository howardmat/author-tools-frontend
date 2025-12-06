import { BreadcrumbActionTypes, SetActiveWorkspaceAction, SetBreadcrumbWorkspaceAction, WorkspaceActionTypes } from "@/actions";
import { invalidateEntityQueries } from "@/http/query-client";
import { useBreadcrumbContext } from "@/store/breadcrumb/use-breadcrumb-context";
import { useWorkspaceContext } from "@/store/workspace/use-workspace-context";
import { IWorkspace } from "@/types";

export function useGetActiveWorkspace() {
  const { state: workspaceState } =
    useWorkspaceContext();

  return workspaceState.workspace;
}

export function useSetActiveWorkspace() {
  const { state: workspaceState, dispatch: workspaceDispatch } =
    useWorkspaceContext();
  const { dispatch: breadcrumbDispatch } = useBreadcrumbContext();  

  return (workspace: IWorkspace) => {
    const activeWorkspace = workspaceState.workspace;
    const previousWorkspaceId = activeWorkspace.id;

    const setActiveWorkspaceAction: SetActiveWorkspaceAction = {
        type: WorkspaceActionTypes.SET_ACTIVE_WORKSPACE,
        payload: {
        ...workspace,
        },
    };
    workspaceDispatch(setActiveWorkspaceAction);

    const setBreadcrumbWorkspaceAction: SetBreadcrumbWorkspaceAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_WORKSPACE,
      payload: workspace.name,
    };
    breadcrumbDispatch(setBreadcrumbWorkspaceAction);

    invalidateEntityQueries(previousWorkspaceId);
  };
}