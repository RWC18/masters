import React from 'react';
import { genColors } from './genColors';
import { industriesData } from './genIndustries';
import { genStyles, genStylesV2 } from './genStyles';
import { LOCALSTORAGE_KEYS, LOGIN_POPUP_TABS } from './constants';

describe('constants data', () => {
  it('exposes stable localStorage and popup tab keys', () => {
    expect(LOCALSTORAGE_KEYS.ACCESS_TOKEN).toBe('access_token_vai');
    expect(LOCALSTORAGE_KEYS.THEME_MODE).toBe('theme_mode_vai');
    expect(LOGIN_POPUP_TABS).toEqual({
      LOGIN: 'login',
      REGISTER: 'register',
    });
  });

  it('has valid style presets in both style lists', () => {
    const validateStyle = (style: any) => {
      expect(style.title).toEqual(expect.any(String));
      expect(style.prompt).toEqual(expect.any(String));
      expect(style.thumbnail).toEqual(expect.any(String));
      expect(style.title.length).toBeGreaterThan(0);
    };

    expect(genStyles.length).toBeGreaterThan(10);
    expect(genStylesV2.length).toBe(genStyles.length);
    genStyles.forEach(validateStyle);
    genStylesV2.forEach(validateStyle);
  });

  it('has color and industry data with required fields', () => {
    expect(genColors.length).toBeGreaterThan(5);
    genColors.forEach((color) => {
      expect(color.title).toEqual(expect.any(String));
      expect(color.thumbnail.startsWith('/')).toBe(true);
    });

    expect(industriesData.length).toBeGreaterThan(10);
    industriesData.forEach((industry) => {
      expect(industry.title).toEqual(expect.any(String));
      expect(industry.id).toEqual(expect.any(String));
      expect(React.isValidElement(industry.icon)).toBe(true);
    });
  });
});
