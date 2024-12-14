import { createContext } from 'react';
import { BreadcrumbActions } from '../../actions';
import { State } from './breadcrumb-reducers';

type BreadcrumbContextType = {
  state: State;
  dispatch: React.Dispatch<BreadcrumbActions>;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);
export default BreadcrumbContext;
