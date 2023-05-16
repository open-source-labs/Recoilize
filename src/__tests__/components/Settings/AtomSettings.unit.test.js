import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { 
  cleanup, 
  generateStore, 
  render, 
} from '../../testignore/testing'; // custom testing functions necessary to pass tests

import AtomSettings from '../../../app/components/Settings/AtomSettings'; // component being tested
import { snapshotHistoryMock } from '../../../../mock/state-snapshot'; // this is our mock state that we will use to run our tests

const { Multiselect } = require('multiselect-react-dropdown');


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
});