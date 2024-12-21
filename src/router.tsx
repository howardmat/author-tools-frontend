import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/root-layout';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import ContactPage from './pages/contact-page';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';
import AuthenticatedLayout from './components/layout/authenticated-layout';
import SettingsPage from './pages/settings-page';
import { EntityQueryType } from './types';
import EntityListPage from './pages/entity/entity-list-page';
import EntityRootPage from './pages/entity/entity-root-page';
import AddEntityPage from './pages/entity/add-entity-page';
import UpdateEntityPage from './pages/entity/update-entity-page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
    ],
  },
  {
    element: <AuthenticatedLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/settings', element: <SettingsPage /> },
      {
        path: 'characters',
        element: <EntityRootPage />,
        children: [
          {
            index: true,
            element: (
              <EntityListPage
                entityType={EntityQueryType.character}
                title='Characters'
                entityBaseUrl='/characters'
                entityName='character'
              />
            ),
          },
          {
            path: 'add',
            element: (
              <AddEntityPage
                entityType={EntityQueryType.character}
                title='Characters'
                entityBaseUrl='/characters'
                entityName='character'
              />
            ),
          },
          {
            id: 'update-character',
            path: ':id/edit',
            element: (
              <UpdateEntityPage
                entityType={EntityQueryType.character}
                title='Characters'
                entityBaseUrl='/characters'
                entityName='character'
              />
            ),
          },
        ],
      },
      {
        path: 'locations',
        element: <EntityRootPage />,
        children: [
          {
            index: true,
            element: (
              <EntityListPage
                entityType={EntityQueryType.location}
                title='Locations'
                entityBaseUrl='/locations'
                entityName='locations'
              />
            ),
          },
          {
            path: 'add',
            element: (
              <AddEntityPage
                entityType={EntityQueryType.location}
                title='Locations'
                entityBaseUrl='/locations'
                entityName='locations'
              />
            ),
          },
          {
            id: 'update-location',
            path: ':id/edit',
            element: (
              <UpdateEntityPage
                entityType={EntityQueryType.location}
                title='Locations'
                entityBaseUrl='/locations'
                entityName='locations'
              />
            ),
          },
        ],
      },
      {
        path: 'creatures',
        element: <EntityRootPage />,
        children: [
          {
            index: true,
            element: (
              <EntityListPage
                entityType={EntityQueryType.creature}
                title='Creatures'
                entityBaseUrl='/creatures'
                entityName='creatures'
              />
            ),
          },
          {
            path: 'add',
            element: (
              <AddEntityPage
                entityType={EntityQueryType.creature}
                title='Creatures'
                entityBaseUrl='/creatures'
                entityName='creatures'
              />
            ),
          },
          {
            id: 'update-creature',
            path: ':id/edit',
            element: (
              <UpdateEntityPage
                entityType={EntityQueryType.creature}
                title='Creatures'
                entityBaseUrl='/creatures'
                entityName='creatures'
              />
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
