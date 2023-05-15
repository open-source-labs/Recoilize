import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, generateStore} from '../../testignore/testing';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import AtomSettings from '../../../app/components/Settings/AtomSettings';
import { snapshotHistoryMock } from '../../../../mock/state-snapshot';
const {Multiselect} = require('multiselect-react-dropdown');

afterEach(cleanup);

//ensure atom settings is rendering properly
describe('Atom Settings', () => {
  it('Atom settings renders', () => {
    const settings = document.createElement('div');
    settings.id = 'settings';
    document.body.appendChild(settings)
  
    const store = generateStore({snapshot: snapshotHistoryMock});
    render(<AtomSettings />, {providers: {store}});
  });
  //ensure able to select from dropdown
  it('Multiselect component renders', () => {
    const root = document.createElement('div');
    ReactDOM.render(<Multiselect />, root);
  });
})
  





