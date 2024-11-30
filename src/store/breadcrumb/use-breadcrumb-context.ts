import { useContext } from 'react';
import BreadcrumbContext from './breadcrumb-context';

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error(
      'BreadrumbContext must be used within BreadrumbContextProvider'
    );
  }

  return context;
}
