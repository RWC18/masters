import { i2iActionTypes } from '../Actions/i2iActions';

const initialState = {
  prompt: '',
  image_url: '',
  results: [],
  loading: false,
  error: false,
  selectedStyles: [] as any,
};

export const i2iReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case i2iActionTypes.SET_PROMPT_I2I:
      return { ...state, prompt: action.data };
    case i2iActionTypes.SET_LOADING_I2I:
      return { ...state, loading: action.data };
    case i2iActionTypes.SET_ERROR_I2I:
      return { ...state, error: action.data };
    case i2iActionTypes.SET_RESULTS_I2I:
      return { ...state, results: action.data };
    case i2iActionTypes.SET_UPLOADED_IMAGE_I2I:
      return { ...state, image_url: action.data };
    case i2iActionTypes.SET_SELECTED_STYLES_I2I:
      let tempArr = [...state.selectedStyles];
      let index = tempArr.indexOf(action.data);
      if (index > -1) {
        tempArr.splice(index, 1);
      } else {
        tempArr.push(action.data);
      }
      return {
        ...state,
        selectedStyles: [...tempArr],
      };
    default:
      return state;
  }
};


