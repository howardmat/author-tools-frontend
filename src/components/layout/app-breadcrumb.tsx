import { Fragment } from 'react/jsx-runtime';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { Link } from 'react-router-dom';

export default function AppBreadcrumb() {
  const { state } = useBreadcrumbContext();
  const workspaceName = state.breadcrumbTrail.workspaceName;
  const breadcrumbTrail = state.breadcrumbTrail.trail;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbPage>{workspaceName}</BreadcrumbPage>
        </BreadcrumbItem>

        {breadcrumbTrail.map((breadcrumb) => (
          <Fragment key={breadcrumb.name}>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              {breadcrumb.url && (
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
                </BreadcrumbLink>
              )}
              {!breadcrumb.url && (
                <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
