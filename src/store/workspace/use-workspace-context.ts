import { useContext } from 'react';
import WorkspaceContext from './workspace-context';

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      'WorkspaceContext must be used within WorkspaceContextProvider'
    );
  }

  return context;
}
