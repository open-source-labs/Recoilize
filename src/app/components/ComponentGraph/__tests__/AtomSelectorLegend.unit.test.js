import React from 'react';
import AtomSelectorLegend from '../AtomSelectorLegend';
import {cleanup, render} from '@testing-library/react';
afterEach(cleanup);

it('testing to see if the component is properly rendered', () => {
  const {component, debug} = render(
    // possibly test 'selectedRecoilValue', 'setSelectedRecoilValue', 'setStr' props
    <AtomSelectorLegend selectors={[]} atoms={[]} str={[]} />,
  );
});
