import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

function AtomTree(props) {
  // set the heights and width of the tree to be passed into treeMap function
  const width = 600;
  const height = 600;

  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{ x, y, k }, setZoomState] = useState({});

  // initial state taken from backgroundScript propped drilled down
  // **** REFACTOR SO YOU DONT HAVE TO PROPDRILL ****
  const [snapshotHistory, setSnapshotHistory] = useState(props.snapshotHistory);

  // this state is needed so that the canvas doesn't clear on the first load
  const [initialRender, setInitialRender] = useState(true);

  // this only clears the canvas if AtomTree is already rendered on the extension
  useEffect(() => {
    if (!initialRender) {
      document.getElementById('canvas').innerHTML = '';
      setSnapshotHistory(props.snapshotHistory);
    }
  });

  // this sets the zoomState for the canvas to stay at same position and zoom level on re-renders
  useEffect(() => {
    if (!initialRender) {
      setZoomState(d3.zoomTransform(svgContainer.node()));
    }
  }, [snapshotHistory]);

  // only need to set initial render state to false one time
  useEffect(() => {
    setInitialRender(false);
  }, []);

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
    // .attr('stroke-opacity', 1)
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
    .attr('stroke-width', 1)
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
    .style('fill', 'white')
    .clone(true)
    .lower()
    .attr('stroke', '#2bff00')
    .attr('stroke-width', 1);

  node.on('mouseover', function (d, i) {
    if (!d.children) {
      d3.select(this)
        .append('text')
        .text(JSON.stringify(d.data, undefined, 2))
        .style('fill', 'white')
        .attr('x', 200)
        .attr('y', 50)
        .style('font-size', '3rem')
        .attr('stroke', '#2bff00')
        .attr('id', `popup${i}`);
    }
  });

  node.on('mouseout', function (d, i) {
    d3.select(`#popup${i}`).remove();
  });

  // this allows svg to be dragged around
  node.call(
    d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded)
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
