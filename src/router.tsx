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

//todo commenting after rename. remove later
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
    ],
  },
]);

export default router;
