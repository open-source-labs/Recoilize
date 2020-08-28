import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import AtomSettings from '../AtomSettings';

it('Component Renders', () => {
  const {getByPlaceholderText, debug, getByText} = render(
    <AtomSettings
      snapshotHistory={[{}]}
      selected={[{name: 'lit'}, {name: 'lit2'}, {name: 'lit3'}]}
      setSelected={jest.fn()}
    />,
  );

  getByText('lit');
});
