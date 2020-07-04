import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisualContainer from '../src/app/Containers/VisualContainer.jsx';
import Diff from '../src/app/components/Diff.jsx';
import Tree from '../src/app/components/Tree.jsx';
import AtomTree from '../src/app/components/AtomTree.jsx';

configure({adapter: new Adapter()});

describe('Visual Container Tests', () => {
  let wrapper;
  let navProps;
  beforeAll(() => {
    wrapper = shallow(<VisualContainer />);
    navProps = {
      Diff: <Diff />,
      Tree: <Tree />,
      Visualizer: <AtomTree />,
    };
  });
  it('Visual Container should render NavBar component', () => {
    const navLength = wrapper.find('.VisualContainer');
    expect(navLength.length).toEqual(1);
  });
});
