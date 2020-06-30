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

  // restructuring the data in a way for d3 to read and convert into a tree format
  // using the d3.hierarchy method (look up data structure examples for d3.hierarchy)

  // ***** need to parse data *****
  const makeTree = (obj) => {
    // every name should be val
    // every children should be array

    let result = [];
    let keys = Object.keys(obj);
    keys.forEach((key) => {
      let newObj = {};
      newObj.name = key;
      // obj[key] is a nested object so recurse
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        newObj.children = makeTree(obj[key]);
      } else if (Array.isArray(obj[key])) {
        // obj[key] is an array
        newObj.children = [];
        obj[key].forEach((el, i) => {
          newObj.children.push({
            name: `${key}[${i}]`,
            value: obj[key][i],
          });
        });
      } else {
        // obj[key] is a primitive
        newObj.children = [
          {
            name: JSON.stringify(obj[key]),
          },
        ];
      }

      result.push(newObj);
    });
    return result;
  };

  // need to make this atom state be dynamic to the current snapshot
  const atomState = {
    name: 'Recoil Root',
    // pass in parsed data here
    children: makeTree(snapshotHistory[snapshotHistory.length - 1]),
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

  const g = svg.append('g');
  g.selectAll('.link')
    .data(paths)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      d3
        .linkRadial()
        .angle((d) => {
          return d.x;
        })
        .radius((d) => d.y)
    );

  const node = g.selectAll('.node').data(nodes);

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
