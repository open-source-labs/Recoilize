import React, { useRef } from 'react';
import * as d3 from 'd3';

function AtomTree() {
  const svg = d3.select('#canvas');

  svg
    .append('circle')
    .attr('cx', 1500)
    .attr('cy', 1000)
    .attr('r', 300)
    .style('stroke', 'white');

  return (
    <div className='AtomTree'>
      <svg id='canvas'></svg>
      <h1>hello</h1>
    </div>
  );
}

export default AtomTree;
