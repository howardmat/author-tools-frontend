import { PropsWithChildren, useReducer } from 'react';
import { initialState, reducer } from './breadcrumb-reducers';
import BreadcrumbContext from './breadcrumb-context';

const BreadcrumbContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BreadcrumbContext.Provider value={{ state, dispatch }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbContextProvider;
