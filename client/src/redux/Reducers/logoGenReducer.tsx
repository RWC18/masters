import { logoGenActions } from '../Actions/logoGenActions';

const initialState = {
  brandname: '',
  tagline: '',
  colors: [],
  industries: [],
  results: [],
  loading: false,
  error: false,
  count: 6,
};

export const LogoGenReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case logoGenActions.SET_BRANDNAME_LOGO:
      return { ...state, brandname: action.data };
    case logoGenActions.SET_LOADING_LOGO:
      return { ...state, loading: action.data };
    case logoGenActions.SET_ERROR_LOGO:
      return { ...state, error: action.data };
    case logoGenActions.SET_RESULTS_LOGO:
      return { ...state, results: action.data };
    case logoGenActions.SET_TAGLINE_LOGO:
      return { ...state, tagline: action.data };
    case logoGenActions.SET_SELECTED_COLOR_LOGO:
      return { ...state, colors: [action.data] };
    case logoGenActions.SET_SELECTED_INDUSTRY_LOGO:
      return { ...state, industries: [action.data] };
    default:
      return state;
  }
};
