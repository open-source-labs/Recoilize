import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

function AtomTree(props) {
  // set the heights and width of the tree to be passed into treeMap
  const width = 600;
  const height = 600;

  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{ x, y, k }, setZoomState] = useState({});

  // initial state taken from backgroundScript propped drilled down
  // **** REFACTOR SO YOU DONT HAVE TO PROPDRILL ****
  const [snapshotHistory, setSnapshotHistory] = useState(props.snapshotHistory);

  // on multiple re-renders, clears the canvas and creates a new tree based on new atom state
  useEffect(() => {
    document.getElementById('canvas').innerHTML = '';
  });

  // setting the snapshotHistory state on re-renders
  useEffect(() => {
    setSnapshotHistory(props.snapshotHistory);
  });

  // creating the main svg container for d3 elements
  const svgContainer = d3
    .select('#canvas')
    .attr('width', width)
    .attr('height', height);

  // creating a pseudo-class for reusability
  const g = svgContainer
    .append('g')
    .attr('transform', `translate(${x}, ${y}), scale(${k})`); // sets the canvas to the saved zoomState

  // function that parses and refactors snapshotHistory into an object d3 can understand
  const makeTree = (obj) => {
    if (!obj) return;

    let result = [];
    let keys = Object.keys(obj);
    keys.forEach((key) => {
      let newObj = {};
      newObj.name = key;
      // obj[key] is a nested object so recurse
      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        obj[key]
      ) {
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

  let atomState = {};
  if (snapshotHistory.length > 0) {
    atomState = {
      name: 'Recoil Root',
      // pass in parsed data here
      // call the helper function passing in the most recent snapshot
      children: makeTree(snapshotHistory[snapshotHistory.length - 1]),
    };
  }

  // creating the tree map
  const treeMap = d3.tree().nodeSize([width, height]);

  // creating the nodes of the tree
  const hierarchyNodes = d3.hierarchy(atomState);

  // calling the tree function with nodes created from data
  const finalMap = treeMap(hierarchyNodes);

  // renders a flat array of objects containing all parent-child links
  // renders the paths onto the component
  let paths = finalMap.links();

  // this creates the paths to each atom and its contents in the tree
  g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#2bff00')
    .attr('stroke-opacity', 0.9)
    .attr('stroke-width', 10)
    .selectAll('path')
    .data(paths)
    .join('path')
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  // returns a flat array of objects
  // renders nodes onto the component
  let nodes = hierarchyNodes.descendants();

  const node = g
    .append('g')
    .attr('stroke-linejoin', 'round') // no clue what this does
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

  node.append('circle').attr('fill', '#c300ff').attr('r', 50);

  node
    .append('text')
    .attr('dy', '.31em')
    .attr('x', (d) => (d.children ? -50 : 50))
    .attr('y', (d) => (d.children ? -15 : null))
    .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => d.data.name)
    .style('font-size', `2rem`)
    .clone(true)
    .lower()
    .attr('stroke', 'white');

  useEffect(() => {
    // this allows svg to be dragged around
    node.call(
      d3
        .drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded)
    );

    // this allows the svg to have zoom functionality
    svgContainer.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0, 8])
        .on('zoom', zoomed)
    );

    // helpers to allow dragging
    function dragStarted() {
      d3.select(this).raise();
      g.attr('cursor', 'grabbing');
    }

    function dragged(d) {
      d3.select(this)
        .attr('dx', (d.x = d3.event.x))
        .attr('dy', (d.y = d3.event.y));
    }

    function dragEnded() {
      g.attr('cursor', 'grab');
    }

    // helper function that allows for zooming
    function zoomed() {
      g.attr('transform', d3.event.transform);

      //setting the zoomState equal to whatever the d3.event.transform so svg canvas stays at the same zoom level on multiple renders
      setZoomState(d3.event.transform);
    }
  });
  return (
    <div>
      <div className='AtomTree'>
        <svg id='canvas'></svg>
      </div>
    </div>
  );
}

export default AtomTree;
