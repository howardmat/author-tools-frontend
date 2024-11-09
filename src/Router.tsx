import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/root-layout';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import CharacterListPage from './pages/character/character-list-page';
import AddCharacterPage from './pages/character/add-character-page';
import UpdateCharacterPage from './pages/character/update-character-page';
import CharacterRootPage from './pages/character/character-root-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
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
            path: ':id/edit',
            element: <UpdateCharacterPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
