import React from 'react';
import RankedGraph from '../RankedGraph';
import {
  filteredCurSnapMock,
  componentAtomTreeMock,
} from '../../../../../mock/snapshot.js';
import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

describe('Ranked graph displays correct information', () => {
  it('should display correct atom tree', () => {
    const {asFragment} = render(
      <RankedGraph cleanedComponentAtomTree={componentAtomTreeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  //a component should display the render time of a component
  xit('render time should be of type number', () => {
    //the type of data being rendered should be a number
    expect().toBe();
  });
  xit('should be of type string', () => {
    //that dom element should render a string
    expect().toBe();
  });
  //a component should display the name of the component
  xit('should display correct name', () => {
    //that dom element should display the correct name
    expect().toBe();
  });
});

describe('components rendering correctly', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<RankedGraph />);
    expect(getByTestId('canvas')).toBeTruthy();
  });

  it('should match snapshot when props are passed into RankedGraph', () => {
    const {asFragment} = render(
      <RankedGraph filteredCurSnap={filteredCurSnapMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when no props are passed in', () => {
    const {asFragment} = render(<RankedGraph />);
    expect(asFragment()).toMatchSnapshot();
  });

  xit('should render Recoil Root as text', () => {
    const {getByTestId} = render(<RankedGraph />);
    expect(getByTestId('canvas')).toHaveTextContent('Recoil Root');
  });
});
