import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import CharacterListPage from './pages/character/CharacterListPage';
import AddCharacterPage from './pages/character/AddCharacterPage';
import UpdateCharacterPage from './pages/character/UpdateCharacterPage';
import CharacterRootPage from './pages/character/CharacterRootPage';

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
