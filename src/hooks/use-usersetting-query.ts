import { getUserSetting, postUserSetting, putUserSetting } from "@/http";
import { JWT_TEMPLATE, QUERY_KEYS } from "@/lib/constants";
import { IPutUserSettingParams, IUseMutationCallbacksWithParams, IUserSetting } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from '@/http/query-client';

export function useGetUserSettingQuery() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.USER_SETTINGS, userId],
    queryFn: async ({ signal }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await getUserSetting({ signal, token });
    },
  });
}

export function usePostUserSettingMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IUserSetting>) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (userSetting: IUserSetting) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postUserSetting({ userSetting, token });
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_SETTINGS] });
      if (onSuccess) onSuccess(data);
    },
  });
}

export function usePutUserSettingMutation({
  onSuccess,
  onError,
}: IUseMutationCallbacksWithParams<IUserSetting>) {
  const { getToken, userId } = useAuth();

  return useMutation({
    mutationFn: async ({
      userSetting,
      id,
    }: {
      userSetting: IUserSetting;
      id: string;
    }) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await putUserSetting({ id, userSetting, token });
    },
    onMutate: async (data: IPutUserSettingParams) => {
      const userSetting = data.userSetting;

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.USER_SETTINGS, userId],
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.USER_SETTINGS,
        userId,
      ]);
      queryClient.setQueryData([QUERY_KEYS.USER_SETTINGS, userId], userSetting);

      return { previousData };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.USER_SETTINGS, userId], context);

      if (onError) onError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_SETTINGS],
      });

      if (onSuccess) onSuccess(data);
    },
  });
}