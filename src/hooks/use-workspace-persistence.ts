import { useAuth } from '@clerk/clerk-react';

export function useWorkspacePersistence() {
  const { userId } = useAuth();
  const STORAGE_KEY = `userActiveWorkspaceId_${userId}`;

  const saveWorkspace = (workspaceId: string) => {
    localStorage.setItem(STORAGE_KEY, workspaceId);
  };

  const loadWorkspaceId = (): string | null => {
    return localStorage.getItem(STORAGE_KEY);
  };

  const clearWorkspace = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return { saveWorkspace, loadWorkspaceId, clearWorkspace };
}
