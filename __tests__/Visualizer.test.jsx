import React from 'react';
const { configure, shallow, mount } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
import AtomTree from '../src/app/components/AtomTree.jsx';
const { interpolate } = require('d3');

// newer enzyme versions require an adapter for React v16
configure({ adapter: new Adapter() });

describe('Atom tree visualizer test', () => {
  const Visualizer = shallow(<AtomTree />);
  it('Data taken from background.js should be parsed into d3-readble object', () => {
    expect(true).toEqual(false);
  });
});
