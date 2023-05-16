import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../../../app/components/NavBar/NavBar'; // component being tested


it('renders to the dom', () => {
  const {debug} = render(<Navbar tabsList={[]} />);
});

it('renders to the dom with the tab name', () => {
  const {getByText} = render(
    <Navbar tabsList={['testtab1', 'testtab2', 'testtab3']} />,
  );
  getByText('testtab1');
});
