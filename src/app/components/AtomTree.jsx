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

  console.log(JSON.stringify(snapshotHistory[0]));
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

  paths =
    paths &&
    paths.map((el, i) => {
      let d = d3
        .linkHorizontal()
        .x((d) => {
          console.log('d path', d);
          return d.x;
        })
        .y((d) => d.y);

      return <path key={i} className='link' fill='none' />;
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

  const zoom = d3.zoom();

  function addZoomListener(zoom) {
    const canvasElement = document.getElementById('canvas');
    canvasElement.addEventListener('keydown', (e) => {
      if (e.keycode === 16) {
        console.log('hit');
        startZoom(zoom);
      }
    });

    canvasElement.addEventListener('keyup', (e) => {
      if (e.keycode === 16) endZoom();
    });
  }

  function zoomed() {
    const g = d3.select('#canvas');
    g.attr('transform', d3.event.transform);
  }

  function startZoom(zoom) {
    const svg = d3.select('#canvas');
    svg.call(zoom.on('zoom', zoomed));
  }

  function endZoom() {
    const svg = d3.select('#canvas');
    svg.on('zoom', null);
  }
  svg
    .append('g')
    .attr('width', '100%')
    .attr('height', '100%')
    .call(
      d3.zoom().on('zoom', () => {
        svg.attr('transform', d3.event.transform);
      })
    )
    .append('g');

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
