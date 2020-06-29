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
  const snapshotHistory = props.snapshotHistory;
  console.log(Object.entries(snapshotHistory[0]));
  const mapped = Object.entries(snapshotHistory[0]);

  const atomState = {
    name: 'Recoil Root',
    children: mapped,
  };
  console.log('atom state', atomState);

  // creating the tree map
  const treeMap = d3.tree().nodeSize([width, height]);
  console.log('tree map', treeMap);
  // creating the nodes of the tree
  const hierarchyNodes = d3.hierarchy(atomState);
  console.log('hierarchy nodes', hierarchyNodes);
  // calling the tree function with nodes created from data
  const finalMap = treeMap(hierarchyNodes);
  console.log('final map', finalMap);

  // renders a flat array of objects containing all parent-child links
  // renders the paths onto the component
  let paths = finalMap.links();
  console.log('paths', paths);

  // returns a flat array of objects
  // renders nodes onto the component
  let nodes = hierarchyNodes.descendants();
  console.log('nodes', nodes);

  return (
    <div className='AtomTree'>
      <svg id='canvas' style={{ backgroundColor: 'blue' }}></svg>
    </div>
  );
}

export default AtomTree;
