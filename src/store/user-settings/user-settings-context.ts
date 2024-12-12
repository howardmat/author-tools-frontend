import { createContext } from 'react';
import { UserSettingsActions } from '../../actions';
import { State } from './user-settings-reducers';

type UserSettingsContextType = {
  state: State;
  dispatch: React.Dispatch<UserSettingsActions>;
};

const UserSettingsContext = createContext<UserSettingsContextType | null>(null);
export default UserSettingsContext;
