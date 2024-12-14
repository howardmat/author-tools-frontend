import { THEMES } from '@/lib/constants';
import { UserSettingsActionTypes, UserSettingsActions } from '../../actions';
import { IUserSetting } from '@/types';

export type State = {
  userSetting: IUserSetting;
};

export const initialState: State = {
  userSetting: {
    theme: THEMES.LIGHT,
  },
};

export function reducer(state: State, action: UserSettingsActions) {
  switch (action.type) {
    case UserSettingsActionTypes.SET_USERSETTINGS:
      return {
        userSetting: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
