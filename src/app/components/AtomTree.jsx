import React, { useRef } from 'react';
import * as d3 from 'd3';

function AtomTree(props) {
  console.log('initial atom state in atomTree', props.snapshotHistory);
  // legend
  const svg = d3.select('#canvas');

  // set the heights and width of the tree to be passed into treeMap
  const width = 500;
  const height = 1500;

  // initial state taken from backgroundScript
  const atomState = props.snapshotHistory;

  // creating the tree map
  const treeMap = d3.tree().nodeSize([width, height]);
  // creating the nodes of the tree
  const atomNodes = d3.hierarchy(atomState);

  return (
    <div className='AtomTree'>
      <svg id='canvas'></svg>
    </div>
  );
}

export default AtomTree;
