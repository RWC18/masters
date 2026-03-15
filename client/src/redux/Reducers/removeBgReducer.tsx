import { removeBgActionTypes } from '../Actions/removeBgActions';

const initialState = {
  originalImage: null as string | null,
  resultImage: null as string | null,
  loading: false,
  error: false,
};

export const removeBgReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case removeBgActionTypes.SET_ORIGINAL_IMAGE:
      return { ...state, originalImage: action.data };
    case removeBgActionTypes.SET_RESULT_IMAGE:
      return { ...state, resultImage: action.data };
    case removeBgActionTypes.SET_LOADING_REMOVEBG:
      return { ...state, loading: action.data };
    case removeBgActionTypes.SET_ERROR_REMOVEBG:
      return { ...state, error: action.data };
    case removeBgActionTypes.RESET_REMOVEBG:
      return initialState;
    default:
      return state;
  }
};
