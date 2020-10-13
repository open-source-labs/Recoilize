import React, {useState} from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import SnapshotsList from '../SnapshotList';

// Newer enzyme versions require this configuration to adapt to a particular version of React
configure({ adapter: new Adapter() });

it('Checks if SnapshotList Renders', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const {getByPlaceholderText, debug} = render(
    <SnapshotsList snapshotHistory={[]} />,
  );
});

// Test to see if invalid props break the function. Functional component should render empty div when props are invalid.
describe('Snapshots List Error Handling', () => {
  let wrapper;
  const props = {
    renderIndex: 0,
    snapshotHistoryLength: 1,
    setRenderIndex: jest.fn(),
    timeTravelFunc: jest.fn(),
    selected: [{name: "id"}],
    filter: [],
    snapshotHistory: [{
      componentAtomTree: {
        actualDuration: 12,
        children: [],
        name: 'HR',
        recoilNodes: [],
        tag: 3,
        treeBaseDuration: 6,
        wasSuspended: false,
      },
      filteredSnapshot: {
        id: {
          contents: 1,
          nodeDeps: [],
          nodeToNodeSubscriptions: [],
          type: "RecoilState",
        }
      }
    }],
  }

  it('Snapshots List renders empty divs when props are invalid.', () => {

    wrapper = shallow(<SnapshotsList {...props}  />);
    expect(wrapper.type()).toEqual('div');
  });

});