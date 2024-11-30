import { createContext } from 'react';
import { Actions } from '../../actions';
import { State } from './breadcrumb-reducers';

type BreadcrumbContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);
export default BreadcrumbContext;
