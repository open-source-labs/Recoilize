import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

function AtomTree(props) {
  // set the heights and width of the tree to be passed into treeMap
  const width = 600;
  const height = 600;

  console.log('props tab', props.tab);

  // legend for svg canvas
  const svgContainer = d3
    .select('#canvas')
    .attr('width', width)
    .attr('height', height);

  // creating a pseudo-class for reusability
  const g = svgContainer
    .append('g')
    .attr('transform', `translate(${width / 2 + 4}, ${height / 2 + 2})`);

  // initial state taken from backgroundScript
  const [snapshotHistory, setSnapshotHistory] = useState(props.snapshotHistory);
  useEffect(() => {
    console.log('props snapshothistory', props.snapshotHistory);
    document.getElementById('canvas').innerHTML = '';
    setSnapshotHistory(props.snapshotHistory);
  });
  console.log('snapshotHistory', snapshotHistory);

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
      children: makeTree(snapshotHistory[snapshotHistory.length - 1]),
    };
    console.log('atom state', atomState);
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
  const link = g
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#2bff00')
    .attr('stroke-opacity', 0.9)
    .attr('stroke-width', 5)
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

  // letting the svg canvas be draggable
  node.call(
    d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded)
  );

  // letting the svg canvas be zoomable
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
  }
  return (
    <div>
      <div className='AtomTree'>
        <svg id='canvas'></svg>
      </div>
    </div>
  );
}

export default AtomTree;
