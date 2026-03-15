import { avatarActionTypes } from '../Actions/avatarActions';

const initialState = {
  prompt: '',
  image_url: '',
  selectedStyle: null as string | null,
  results: [] as string[],
  loading: false,
  error: false,
};

export const avatarReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case avatarActionTypes.SET_PROMPT_AVATAR:
      return { ...state, prompt: action.data };
    case avatarActionTypes.SET_LOADING_AVATAR:
      return { ...state, loading: action.data };
    case avatarActionTypes.SET_ERROR_AVATAR:
      return { ...state, error: action.data };
    case avatarActionTypes.SET_RESULTS_AVATAR:
      return { ...state, results: action.data };
    case avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR:
      return { ...state, image_url: action.data };
    case avatarActionTypes.SET_SELECTED_STYLE_AVATAR:
      return { ...state, selectedStyle: action.data };
    default:
      return state;
  }
};
