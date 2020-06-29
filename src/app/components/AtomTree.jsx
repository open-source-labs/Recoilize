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
  let snapshotHistory = props.snapshotHistory;

  console.log(snapshotHistory[0]);
  // restructuring the data in a way for d3 to read and convert into a tree format
  // using the d3.hierarchy method (look up data structure examples for d3.hierarchy)

  // ***** need to parse data *****

  const atomState = {
    name: 'Recoil Root',
    // pass in parsed data here
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

  paths =
    paths &&
    paths.map((el, i) => {
      let d = d3
        .linkHorizontal()
        .x((d) => {
          return d.x + 8000;
        })
        .y((d) => d.y - 900);

      return <path key={i} className='link' fill='none' d={d(el)} />;
    });

  nodes =
    nodes &&
    nodes.map((node, i) => {
      return (
        <g key={i} transform={`translate(${node.x + 800}, ${node.y - 900})`}>
          {node.data[1] !== null ? (
            <rect x='-150' y='0' width='300' height='300'></rect>
          ) : (
            <circle r='150' />
          )}
        </g>
      );
    });

  return (
    <div className='AtomTree' width='100vw' height='1000'>
      <svg id='canvas' style={{ backgroundColor: 'blue' }} width='100000'>
        {paths}
        {nodes}
      </svg>
    </div>
  );
}

export default AtomTree;
