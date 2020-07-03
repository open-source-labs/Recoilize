import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AtomTree from '../app/components/AtomTree.jsx';

// newer enzyme versions require an adapter for React v16
configure({ adapter: new Adatper() });
