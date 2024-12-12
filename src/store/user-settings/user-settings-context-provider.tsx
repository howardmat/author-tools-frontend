import { PropsWithChildren, useReducer } from 'react';
import UserSettingsContext from './user-settings-context';
import { initialState, reducer } from './user-settings-reducers';

const UserSettingsContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;
