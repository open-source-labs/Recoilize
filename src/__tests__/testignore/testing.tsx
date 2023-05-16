// this file will hold our custom render, so that when we run tests the component is wrapped in a provider with necessary state when Jest renders it (5.2023)
// follwed this guide: https://betterprogramming.pub/react-testing-library-configuration-for-productive-unit-testing-5d0c446f3b3d

// this file is within a testignore folder because it is necessary for multiple test files, however we do not want to test it. (5.2023)

import React, { ReactElement } from 'react';
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { rootReducer } from '../../app/state-management/index';


export type ProvidersRenderOptions = {
  store?: Store;
};

export type CustomRenderOptions = {
  providers?: ProvidersRenderOptions;
};

const AllTheProviders =
  (options: ProvidersRenderOptions = {}) =>
  ({children}: {children: React.ReactNode}) => {
    const store = options.store ?? configureStore({reducer: rootReducer});
    return <Provider store={store}>{children}</Provider>;
  };

// custom render function wraps our component in a provider
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const {providers, ...others} = options;
  render(ui, {wrapper: AllTheProviders(providers), ...others});
};

export const generateStore = (
  preloadedState: PreloadedState<typeof rootReducer>,
) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false})
  });
};

export * from '@testing-library/react';
export {customRender as render};