import React, {useState} from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnapshotsList from '../SnapshotList';

// Newer enzyme versions require this configuration to adapt to a particular version of React
configure({adapter: new Adapter()});

describe('Testing for rendering of SnapshotList under several expected conditions', () => {
  let wrapper;
  let childObj;
  let props;
  beforeEach(() => {
    childObj = {
      actualDuration: 14,
      children: [],
      name: 'Replace',
      recoildNodes: [],
      tag: 0,
      treeBaseDuration: 6,
      wasSuspended: false,
    };

    props = {
      renderIndex: 0,
      snapshotHistoryLength: 1,
      setRenderIndex: jest.fn(),
      timeTravelFunc: jest.fn(),
      selected: [{name: 'id'}],
      filter: [],
      snapshotHistory: [
        {
          componentAtomTree: {
            actualDuration: 12,
            children: [
              {
                ...childObj,
                name: 'RecoilRoot',
                childdren: [
                  {
                    ...childObj,
                    tag: 10,
                    children: [{...childObj}],
                  },
                ],
              },
            ],
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
              type: 'RecoilState',
            },
          },
        },
      ],
    };
  });

  it('Renders with no componentAtomTree children', () => {
    props.snapshotHistory[0].componentAtomTree.children = [];
    wrapper = shallow(<SnapshotsList {...props} />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('div').first().hasClass('SnapshotsList')).toEqual(true);
  });

  it('Renders one div with class individualSnapshot when filter is empty', () => {
    wrapper = shallow(<SnapshotsList {...props} />);
    let individual = 0;
    for (let key of wrapper.find('div')) {
      if (key.props) {
        if (key.props.className) {
          if (key.props.className === 'individualSnapshot') individual += 1;
        }
      }
    }
    expect(individual).toBe(1);
  });

  // Test to see if invalid props break the function. Functional component should render empty div when props are invalid.
  describe('Snapshots List Error Handling', () => {
    it('Snapshots List renders empty divs when renderIndex is invalid', () => {
      props.renderIndex = -1;
      wrapper = shallow(<SnapshotsList {...props} />);
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('div').first().hasClass('SnapshotsList')).toEqual(
        true,
      );
    });

    it('Handles the snapshotHistoryLength prop being greater than the filter length', () => {
      props.snapshotHistoryLength = 8;
      wrapper = shallow(<SnapshotsList {...props} />);
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('div').first().hasClass('SnapshotsList')).toEqual(
        true,
      );
    });
  });
});
