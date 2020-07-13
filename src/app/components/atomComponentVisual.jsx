import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

function AtomComponentVisual({
  componentAtomTree,
  filteredSnapshot,
  selectedRecoilValue,
  atoms,
  selectors,
}) {
  // set the heights and width of the tree to be passed into treeMap function
  const width = 600;
  const height = 1100;
  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{x, y, k}, setZoomState] = useState({x: 0, y: 0, k: 0});

  // create objects to hold the selected atom or selector and all of it's relationships to other atoms/selectors
  // const selectorToAtom = {};
  // const atomToSelector = {};
  // if (selectedRecoilValue[1] === 'selector'){
  //   selectorToAtom[selectedRecoilValue[0]] = filteredSnapshot[selectedRecoilValue[0]].nodeDeps;
  // }
  // if (selectedRecoilValue[1] === 'atom'){
  //   atomToSelector[selectedRecoilValue[0]] = filteredSnapshot[selectedRecoilValue[0]].nodeToNodeSubscriptions;
  // }

  useEffect(() => {
    setZoomState(d3.zoomTransform(d3.select('#canvas').node()));
  }, [componentAtomTree]);

  // this only clears the canvas if Visualizer is already rendered on the extension
  useEffect(() => {
    document.getElementById('canvas').innerHTML = '';

    // creating the main svg container for d3 elements
    const svgContainer = d3
      .select('#canvas')
      .attr('width', width)
      .attr('height', height);

    // creating a pseudo-class for reusability
    const g = svgContainer
      .append('g')
      .attr('transform', `translate(${x}, ${y}), scale(${k})`); // sets the canvas to the saved zoomState

    // creating the tree map
    const treeMap = d3.tree().nodeSize([width, height]);

    // creating the nodes of the tree
    // pass
    //// sean debug
    const hierarchyNodes = componentAtomTree
      ? d3.hierarchy(componentAtomTree)
      : d3.hierarchy({name: 'placeholder', children: []});

    // calling the tree function with nodes created from data
    const finalMap = treeMap(hierarchyNodes);

    // renders a flat array of objects containing all parent-child links
    // renders the paths onto the component
    let paths = finalMap.links();

    // this creates the paths to each atom and its contents in the tree
    g.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#646464')
      .attr('stroke-width', 5)
      .selectAll('path')
      .data(paths)
      .join('path')
      .attr(
        'd',
        d3
          .linkVertical()
          .x(d => d.x)
          .y(d => d.y),
      );

    // returns a flat array of objects containing all the nodes and their information
    // renders nodes onto the canvas
    let nodes = hierarchyNodes.descendants();

    // const node is used to create all the nodes
    // this segment places all the nodes on the canvas
    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round') // no clue what this does
      .attr('stroke-width', 5)
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('class', 'atomNodes');

    // for each node that got created, append a circle element
    node.append('circle').attr('fill', colorComponents).attr('r', 50);

    // for each node that got created, append a text element that displays the name of the node
    node
      .append('text')
      .attr('dy', '.31em')
      .attr('x', d => (d.children ? -75 : 75))
      .attr('text-anchor', d => (d.children ? 'end' : 'start'))
      .text(d => d.data.name)
      .style('font-size', `2rem`)
      .style('fill', 'white')
      .clone(true)
      .lower()
      .attr('stroke', '#646464')
      .attr('stroke-width', 2);

    // adding a mouseOver event handler to each node
    // only add popup text on nodes with no children
    // display the data in the node on hover
    // node.on('mouseover', function (d, i) {
    //   if (!d.children) {
    //     d3.select(this)
    //       .append('text')
    //       .text(JSON.stringify(d.data, undefined, 2))
    //       .style('fill', 'white')
    //       .attr('x', 75)
    //       .attr('y', 60)
    //       .style('font-size', '3rem')
    //       .attr('stroke', '#646464')
    //       .attr('id', `popup${i}`);
    //   }
    // });

    // // add mouseOut event handler that removes the popup text
    // node.on('mouseout', function (d, i) {
    //   d3.select(`#popup${i}`).remove();
    // });

    // allows the canvas to be draggable
    node.call(
      d3
        .drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded),
    );

    // allows the canvas to be zoomable
    svgContainer.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0, 8])
        .on('zoom', zoomed),
    );

    // helper functions that help with dragging functionality
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

    function colorComponents(d) {
      // if component node cointains recoil atoms or selectors, make it orange red or yellow, otherwise keep node gray
      if (d.data.recoilNodes) {
        if (d.data.recoilNodes.includes(selectedRecoilValue[0])) {
          return 'white';
        }

        let hasAtom = false;
        let hasSelector = false;
        for (let i = 0; i < d.data.recoilNodes.length; i++) {
          if (atoms.hasOwnProperty([d.data.recoilNodes[i]])) {
            hasAtom = true;
          }
          if (selectors.hasOwnProperty([d.data.recoilNodes[i]])) {
            hasSelector = true;
          }
        }

        if (hasAtom && hasSelector) {
          return 'orange';
        }
        if (hasAtom) {
          return 'red';
        } else {
          return 'yellow';
        }
      }

      return 'gray';
    }
  });

  return (
    <div>
      <div className="AtomComponentVisual">
        <svg id="canvas"></svg>
      </div>
    </div>
  );
}

export default AtomComponentVisual;
