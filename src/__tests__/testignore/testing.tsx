// this file will hold our custom render, so that when we run tests the component is wrapped in a react-redux provider when Jest renders it
// followed this guide: https://betterprogramming.pub/react-testing-library-configuration-for-productive-unit-testing-5d0c446f3b3d

// this file is within a testignore folder because it is necessary for multiple test files, however we do not want to test it.

import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';

import {rootReducer} from '../../app/state-management/index';
import {configureStore, Store, PreloadedState} from '@reduxjs/toolkit';

export type ProvidersRenderOptions = {
  store?: Store;
};

export type CustomRenderOptions = {
  providers?: ProvidersRenderOptions;
};

// this sets up our provider to give the component a react-redux provider. Followed from React-Testing-Library's custom render docs
const AllTheProviders =
  (options: ProvidersRenderOptions = {}) =>
  ({children}: {children: React.ReactNode}) => {
    const store = options.store ?? configureStore({reducer: rootReducer});
    return <Provider store={store}>{children}</Provider>;
  };

// this uses the wrapper option to wrap whatever we are rendering in our "AllTheProviders" component
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const {providers, ...others} = options;
  render(ui, {wrapper: AllTheProviders(providers), ...others});
};

// this generates a store for the component to use
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

// use the wildcare here so that we can import anything from react testing library from this file
export * from '@testing-library/react';
// when we import render from this file, we will be importing our custom render function, wrapping the component in a provider
export {customRender as render};
