import { mainReducer } from './mainReducer';
import { i2iReducer } from './i2iReducer';
import { t2iReducer } from './t2iReducer';
import { removeBgReducer } from './removeBgReducer';
import { avatarReducer } from './avatarReducer';
import { LogoGenReducer } from './logoGenReducer';
import { mainActionTypes } from '../Actions/mainActions';
import { i2iActionTypes } from '../Actions/i2iActions';
import { t2iActionTypes } from '../Actions/t2iActions';
import { removeBgActionTypes } from '../Actions/removeBgActions';
import { avatarActionTypes } from '../Actions/avatarActions';
import { logoGenActions } from '../Actions/logoGenActions';

jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));

describe('reducers', () => {
  it('mainReducer handles user and popup actions', () => {
    const initial = mainReducer(undefined, { type: '@@INIT', data: null });
    expect(initial.user).toBeNull();

    const withUser = mainReducer(initial, { type: mainActionTypes.SET_USER, data: { id: '1' } });
    expect(withUser.user).toEqual({ id: '1' });

    const withPopupStatus = mainReducer(withUser, { type: mainActionTypes.SET_POP_UP_STATUS, data: true });
    expect(withPopupStatus.popUpStatus).toBe(true);

    const withPopupContent = mainReducer(withPopupStatus, { type: mainActionTypes.SET_POP_UP_CONTENT, data: 'hello' });
    expect(withPopupContent.popUpContent).toBe('hello');
  });

  it('i2iReducer toggles selected styles', () => {
    const style = { title: 'S1' };
    const first = i2iReducer(undefined, { type: i2iActionTypes.SET_SELECTED_STYLES_I2I, data: style });
    expect(first.selectedStyles).toEqual([style]);

    const second = i2iReducer(first, { type: i2iActionTypes.SET_SELECTED_STYLES_I2I, data: style });
    expect(second.selectedStyles).toEqual([]);
  });

  it('i2iReducer handles prompt/image/loading/error/results', () => {
    let state = i2iReducer(undefined, { type: i2iActionTypes.SET_PROMPT_I2I, data: 'p' });
    state = i2iReducer(state, { type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I, data: 'img' });
    state = i2iReducer(state, { type: i2iActionTypes.SET_LOADING_I2I, data: true });
    state = i2iReducer(state, { type: i2iActionTypes.SET_ERROR_I2I, data: true });
    state = i2iReducer(state, { type: i2iActionTypes.SET_RESULTS_I2I, data: ['r'] });
    expect(state).toMatchObject({ prompt: 'p', image_url: 'img', loading: true, error: true, results: ['r'] });
  });

  it('t2iReducer toggles selected styles and updates fields', () => {
    const style = { prompt: 'cinematic' };
    let state = t2iReducer(undefined, { type: t2iActionTypes.SET_PROMPT_T2I, data: 'cat' });
    state = t2iReducer(state, { type: t2iActionTypes.SET_LOADING_T2I, data: true });
    state = t2iReducer(state, { type: t2iActionTypes.SET_ERROR_T2I, data: true });
    state = t2iReducer(state, { type: t2iActionTypes.SET_RESULTS_T2I, data: ['a'] });
    state = t2iReducer(state, { type: t2iActionTypes.SET_SELECTED_STYLES_T2I, data: style });
    expect(state.selectedStyles).toEqual([style]);
    state = t2iReducer(state, { type: t2iActionTypes.SET_SELECTED_STYLES_T2I, data: style });
    expect(state.selectedStyles).toEqual([]);
  });

  it('removeBgReducer updates fields and resets', () => {
    let state = removeBgReducer(undefined, { type: removeBgActionTypes.SET_ORIGINAL_IMAGE, data: 'orig' });
    state = removeBgReducer(state, { type: removeBgActionTypes.SET_RESULT_IMAGE, data: 'res' });
    state = removeBgReducer(state, { type: removeBgActionTypes.SET_LOADING_REMOVEBG, data: true });
    state = removeBgReducer(state, { type: removeBgActionTypes.SET_ERROR_REMOVEBG, data: true });
    expect(state).toMatchObject({ originalImage: 'orig', resultImage: 'res', loading: true, error: true });
    const reset = removeBgReducer(state, { type: removeBgActionTypes.RESET_REMOVEBG, data: null });
    expect(reset).toEqual({
      originalImage: null,
      resultImage: null,
      loading: false,
      error: false,
    });
  });

  it('avatarReducer updates all fields', () => {
    let state = avatarReducer(undefined, { type: avatarActionTypes.SET_PROMPT_AVATAR, data: 'me' });
    state = avatarReducer(state, { type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR, data: 'image' });
    state = avatarReducer(state, { type: avatarActionTypes.SET_SELECTED_STYLE_AVATAR, data: 'anime' });
    state = avatarReducer(state, { type: avatarActionTypes.SET_RESULTS_AVATAR, data: ['r1'] });
    state = avatarReducer(state, { type: avatarActionTypes.SET_LOADING_AVATAR, data: true });
    state = avatarReducer(state, { type: avatarActionTypes.SET_ERROR_AVATAR, data: true });
    expect(state).toMatchObject({
      prompt: 'me',
      image_url: 'image',
      selectedStyle: 'anime',
      results: ['r1'],
      loading: true,
      error: true,
    });
  });

  it('LogoGenReducer updates logo generation state', () => {
    let state = LogoGenReducer(undefined, { type: logoGenActions.SET_BRANDNAME_LOGO, data: 'Acme' });
    state = LogoGenReducer(state, { type: logoGenActions.SET_TAGLINE_LOGO, data: 'Best' });
    state = LogoGenReducer(state, { type: logoGenActions.SET_SELECTED_COLOR_LOGO, data: 'blue' });
    state = LogoGenReducer(state, { type: logoGenActions.SET_SELECTED_INDUSTRY_LOGO, data: 'tech' });
    state = LogoGenReducer(state, { type: logoGenActions.SET_RESULTS_LOGO, data: ['logo1'] });
    state = LogoGenReducer(state, { type: logoGenActions.SET_LOADING_LOGO, data: true });
    state = LogoGenReducer(state, { type: logoGenActions.SET_ERROR_LOGO, data: true });

    expect(state).toMatchObject({
      brandname: 'Acme',
      tagline: 'Best',
      colors: ['blue'],
      industries: ['tech'],
      results: ['logo1'],
      loading: true,
      error: true,
    });
  });
});
