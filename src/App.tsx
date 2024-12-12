import router from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './http/query-client';
import UserSettingsContextProvider from './store/user-settings/user-settings-context-provider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsContextProvider>
        <RouterProvider router={router} />
      </UserSettingsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
