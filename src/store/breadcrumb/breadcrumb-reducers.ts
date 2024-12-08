import { ActionTypes, Actions } from '../../actions';
import { IBreadcrumbTrail } from '../../types';

export type State = {
  breadcrumbTrail: IBreadcrumbTrail;
};

export const initialState: State = {
  breadcrumbTrail: {
    workspaceName: '',
    trail: [],
  },
};

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_BREADCRUMB_WORKSPACE:
      return {
        breadcrumbTrail: {
          ...state.breadcrumbTrail,
          workspaceName: action.payload,
        },
      };

    case ActionTypes.SET_BREADCRUMB_TRAIL:
      return {
        breadcrumbTrail: {
          ...state.breadcrumbTrail,
          trail: action.payload,
        },
      };

    case ActionTypes.ADD_BREADCRUMB_TRAIL: {
      const stateCopy = {
        breadcrumbTrail: {
          ...state.breadcrumbTrail,
        },
      };
      if (
        stateCopy.breadcrumbTrail.trail.find(
          (t) => t.name === action.payload.name
        )
      )
        return state;

      stateCopy.breadcrumbTrail.trail.push(action.payload);
      return stateCopy;
    }

    default:
      return state;
  }
}
