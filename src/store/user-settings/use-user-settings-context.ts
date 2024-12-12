import { useContext } from 'react';
import UserSettingsContext from './user-settings-context';

export function useUserSettingsContext() {
  const context = useContext(UserSettingsContext);

  if (!context) {
    throw new Error(
      'UserSettingsContext must be used within UserSettingsContextProvider'
    );
  }

  return context;
}
