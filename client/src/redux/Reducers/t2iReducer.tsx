import { t2iActionTypes } from '../Actions/t2iActions';

const initialState = {
  prompt: '',
  results: [],
  loading: false,
  error: false,
  selectedStyles: [] as any,
};

export const t2iReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case t2iActionTypes.SET_PROMPT_T2I:
      return { ...state, prompt: action.data };
    case t2iActionTypes.SET_LOADING_T2I:
      return { ...state, loading: action.data };
    case t2iActionTypes.SET_ERROR_T2I:
      return { ...state, error: action.data };
    case t2iActionTypes.SET_RESULTS_T2I:
      return { ...state, results: action.data };
    case t2iActionTypes.SET_SELECTED_STYLES_T2I:
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
