import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, generateStore} from '../../../tests/testing';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import AtomSettings from '../AtomSettings';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';
const {Multiselect} = require('multiselect-react-dropdown');


afterEach(cleanup);

describe('Atom Settings', () => {
  it('Atom settings renders', () => {
    const settings = document.createElement('div');
    settings.id = 'settings';
    document.body.appendChild(settings)
  
    const store = generateStore({snapshot: snapshotHistoryMock});
    render(<AtomSettings />, {providers: {store}});
  });
  it('Multiselect component renders', () => {
    const root = document.createElement('div');
    ReactDOM.render(<Multiselect />, root);
  });
})
  





