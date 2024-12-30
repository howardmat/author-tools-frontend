import { PropsWithChildren, useReducer } from 'react';
import WorkspaceContext from './workspace-context';
import { initialState, reducer } from './workspace-reducers';

const WorkspaceContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
