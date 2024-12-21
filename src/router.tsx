import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/root-layout';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import ContactPage from './pages/contact-page';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';
import CharacterListPage from './pages/character/character-list-page';
import AddCharacterPage from './pages/character/add-character-page';
import UpdateCharacterPage from './pages/character/update-character-page';
import CharacterRootPage from './pages/character/character-root-page';
import AuthenticatedLayout from './components/layout/authenticated-layout';
import SettingsPage from './pages/settings-page';
import LocationRootPage from './pages/location/location-root-page';
import LocationListPage from './pages/location/location-list-page';
import AddLocationPage from './pages/location/add-location-page';
import UpdateLocationPage from './pages/location/update-location-page';
import CreatureRootPage from './pages/creature/creature-root-page';
import CreatureListPage from './pages/creature/creature-list-page';
import AddCreaturePage from './pages/creature/add-creature-page';
import UpdateCreaturePage from './pages/creature/update-creature-page';

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
        element: <CharacterRootPage />,
        children: [
          {
            index: true,
            element: <CharacterListPage />,
          },
          {
            path: 'add',
            element: <AddCharacterPage />,
          },
          {
            id: 'update-character',
            path: ':id/edit',
            element: <UpdateCharacterPage />,
          },
        ],
      },
      {
        path: 'locations',
        element: <LocationRootPage />,
        children: [
          {
            index: true,
            element: <LocationListPage />,
          },
          {
            path: 'add',
            element: <AddLocationPage />,
          },
          {
            id: 'update-location',
            path: ':id/edit',
            element: <UpdateLocationPage />,
          },
        ],
      },
      {
        path: 'creatures',
        element: <CreatureRootPage />,
        children: [
          {
            index: true,
            element: <CreatureListPage />,
          },
          {
            path: 'add',
            element: <AddCreaturePage />,
          },
          {
            id: 'update-creature',
            path: ':id/edit',
            element: <UpdateCreaturePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
