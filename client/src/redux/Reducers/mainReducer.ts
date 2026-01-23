import { mainActionTypes } from '../Actions/mainActions';

const initialState = {
 user: null,
 popUpStatus: false,
 popUpContent: null
};

export const mainReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case mainActionTypes.SET_USER:
      return { ...state, user: action.data };
    case mainActionTypes.SET_POP_UP_STATUS:
      return { ...state, popUpStatus: action.data };
    case mainActionTypes.SET_POP_UP_CONTENT:
      return { ...state, popUpContent: action.data };
    default:
      return state;
  }
};


