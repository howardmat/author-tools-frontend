import { QUERY_KEYS } from '@/lib/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export function invalidateEntityQueries(workspaceId: string) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.CHARACTERS, workspaceId],
  });
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.CREATURES, workspaceId],
  });
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.LOCATIONS, workspaceId],
  });
}