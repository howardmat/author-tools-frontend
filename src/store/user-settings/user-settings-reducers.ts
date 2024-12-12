import { THEMES } from '@/lib/constants';
import { UserSettingsActionTypes, UserSettingsActions } from '../../actions';

export type State = {
  theme: string;
};

export const initialState: State = {
  theme: THEMES.LIGHT,
};

export function reducer(state: State, action: UserSettingsActions) {
  switch (action.type) {
    case UserSettingsActionTypes.SET_USERSETTINGS_THEME:
      return {
        theme: action.payload,
      };

    default:
      return state;
  }
}
