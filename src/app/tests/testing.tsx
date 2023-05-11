// this file will hold our custom render, so that when we run tests the component is wrapped in a provider with necessary state when Jest renders it
// follwed this guide: https://betterprogramming.pub/react-testing-library-configuration-for-productive-unit-testing-5d0c446f3b3d

import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';

import {rootReducer} from '../state-management/index';
import {configureStore, Store, PreloadedState} from '@reduxjs/toolkit';

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
