import { createContext } from 'react';
import { WorkspaceActions } from '../../actions';
import { State } from './workspace-reducers';

type WorkspaceContextType = {
  state: State;
  dispatch: React.Dispatch<WorkspaceActions>;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);
export default WorkspaceContext;
