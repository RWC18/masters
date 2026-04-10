'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/ThemeContext';
import '../i18n/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
