import { deleteWorkspace, getWorkspace, getWorkspaces, postWorkspace, putWorkspace } from "@/http";
import { queryClient } from "@/http/query-client";
import { JWT_TEMPLATE, QUERY_KEYS } from "@/lib/constants";
import { IPutWorkspaceParams, IUseMutationCallbacksWithParams, IWorkspace } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetWorkspacesQuery() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.WORKSPACES, userId],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getWorkspaces({ signal, token });
    },
  });
}

export function useGetWorkspaceQuery(id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.WORKSPACES, id],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getWorkspace({ id, signal, token });
    },
  });
}

export function usePostWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IWorkspace>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (workspace: IWorkspace) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postWorkspace({ workspace, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACES] });
      if (onSuccess) onSuccess(data);
    },
  });
}

export function usePutWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IWorkspace>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      workspace,
      id,
    }: {
      workspace: IWorkspace;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putWorkspace({ id, workspace, token });
    },
    onMutate: async (data: IPutWorkspaceParams) => {
      const workspace = data.workspace;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.WORKSPACES, workspace.id],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.WORKSPACES,
        workspace.id,
      ]);
      queryClient.setQueryData(
        [QUERY_KEYS.WORKSPACES, workspace.id],
        workspace
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.WORKSPACES, variables.id], context);

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACES],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}

export function useDeleteWorkspaceMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<string>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      await deleteWorkspace({ id, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACES] });
      if (onSuccess) onSuccess(variables);
    },
  });
}