import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import Zoom from './Zoom.jsx';

function AtomTree(props) {
  // set the heights and width of the tree to be passed into treeMap
  const width = 500;
  const height = 1500;

  // legend for svg canvas
  const svgContainer = d3
    .select('#canvas')
    .attr('width', width)
    .attr('height', height);

  const g = svgContainer
    .append('g')
    .attr('transform', `translate(${width / 2 + 4}, ${height / 2 + 2})`);

  // initial state taken from backgroundScript
  const [snapshotHistory, setSnapshotHistory] = useState(props.snapshotHistory);
  useEffect(() => {
    setSnapshotHistory(props.snapshotHistory);
  });
  console.log('snapshotHistory', snapshotHistory);

  // restructuring the data in a way for d3 to read and convert into a tree format
  // using the d3.hierarchy method (look up data structure examples for d3.hierarchy)

  // ***** need to parse data *****
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

  g.selectAll('.link')
    .data(paths)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      d3
        .linkRadial()
        .angle((d) => d.x)
        .radius((d) => d.y)
    );

  // returns a flat array of objects
  // renders nodes onto the component
  let nodes = hierarchyNodes.descendants();
  console.log('nodes', nodes);

  const node = g
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => {
      console.log('d inside node', d);
      // return `translate(${d.event.transform})`;
    });

  node
    .append('circle')
    .attr('r', 15)
    .on('mouseover', function (d) {
      d3.select(this).transition(100).duration(20).attr('r', 25);
    })
    .on('mouseout', function (d) {
      d3.select(this).transition().duration(300).attr('r', 15);
    });

  node.call(
    d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded)
  );

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

  function zoomed() {
    g.attr('transform', d3.event.transform);
  }
  // const node = g.selectAll('.node').data(nodes);

  //trying to work on zoom container

  // const zoom = d3.zoom().on('zoom', zoomed);
  // const zoomContainer = document.getElementById('zoomContainer');
  // zoomContainer.call(zoom);

  // let transform = d3.event.transform;

  // zoomContainer.attr('transform', transform.toString());

  return (
    <div className='AtomTree' width='100vw' height='100vh'>
      <svg
        id='canvas'
        style={{ backgroundColor: 'blue' }}
        height='100000'
        width='100000'
      ></svg>
      <rect id='zoomContainer' style={{ opacity: 0 }} pointerEvents='all'>
        {/* {paths}
        {nodes} */}
      </rect>
    </div>
  );
}

export default AtomTree;
