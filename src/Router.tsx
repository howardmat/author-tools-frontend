import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import CharacterPage from './pages/CharacterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'characters', element: <CharacterPage /> },
    ],
  },
]);

export default router;
