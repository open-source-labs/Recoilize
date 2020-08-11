import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import {componentAtomTree, atom, selector} from '../../../types';

interface AtomComponentVisualProps {
  componentAtomTree: componentAtomTree;
  selectedRecoilValue: any[];
  atoms: atom;
  selectors: selector;
}

const AtomComponentVisual: React.FC<AtomComponentVisualProps> = ({
  componentAtomTree,
  selectedRecoilValue,
  atoms,
  selectors,
}) => {
  // set the heights and width of the tree to be passed into treeMap function
  const width = 400;
  const height = 733.33;
  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{x, y, k}, setZoomState] = useState({x: 0, y: 0, k: 0});

  useEffect(() => {
    setZoomState(d3.zoomTransform(d3.select('#canvas').node()));
  }, [componentAtomTree, selectedRecoilValue]);

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

    // chrome.extension
    //   .getBackgroundPage()
    //   .window.console.log('this is the componentAtomTree ', componentAtomTree);

    console.log('this is the componentAtomTree ', componentAtomTree);
    console.log('this is the treemap ', treeMap);

    // creating the nodes of the tree
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
          .x((d: any) => d.x)
          .y((d: any) => d.y),
      );

    // returns a flat array of objects containing all the nodes and their information
    // renders nodes onto the canvas
    let nodes = hierarchyNodes.descendants();

    // const node is used to create all the nodes
    // this segment places all the nodes on the canvas
    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 1)
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
      .attr('class', 'atomNodes');

    // for each node that got created, append a circle element
    node
      .append('circle')
      .attr('fill', colorComponents)
      .attr('r', determineSize);

    // for each node that got created, append a text element that displays the name of the node
    node
      .append('text')
      .attr('dy', '.31em')
      .attr('x', (d: any) => (d.data.recoilNodes ? -175 : -75))
      //.attr('x', '-175')
      //.attr('text-anchor', d => (d.children ? 'end' : 'start'))
      .attr('text-anchor', 'end')
      .text((d: any) => d.data.name)
      .style('font-size', `3rem`)
      .style('fill', 'white')
      .clone(true)
      .lower()
      .attr('stroke', '#646464')
      .attr('stroke-width', 2);

    // adding a mouseOver event handler to each node
    // only add popup text on nodes with no children
    // display the data in the node on hover
    node.on('mouseover', function (d: any, i: any) {
      if (d.data.recoilNodes) {
        for (let x = 0; x < d.data.recoilNodes.length; x++) {
          d3.select(this)
            .append('text')
            //.text(JSON.stringify(d.data.recoilNodes))
            .text(formatAtomSelectorText(d.data.recoilNodes[x]))
            .style('fill', 'white')
            .attr('x', formatMouseoverXValue(d.data.recoilNodes[x]))
            .attr('y', 200 + x * 55)
            .style('font-size', '3.5rem')
            .attr('stroke', '#646464')
            .attr('id', `popup${i}${x}`);
        }
      }
    });

    // add mouseOut event handler that removes the popup text
    node.on('mouseout', function (d: any, i: any) {
      for (let x = 0; x < d.data.recoilNodes.length; x++) {
        d3.select(`#popup${i}${x}`).remove();
      }
    });

    // allows the canvas to be draggable
    node.call(
      d3
        .drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded),
    );

    // allows the canvas to be zoom-able
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

    function dragged(d: any) {
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

    function formatMouseoverXValue(recoilValue: any) {
      if (atoms.hasOwnProperty(recoilValue)) {
        return -300;
      }
      return -425;
    }

    function formatAtomSelectorText(atomOrSelector: any) {
      let str = '';

      atoms.hasOwnProperty(atomOrSelector)
        ? (str += `ATOM ${atomOrSelector}: ${JSON.stringify(
            atoms[atomOrSelector],
          )}`)
        : (str += `SELECTOR ${atomOrSelector}: ${JSON.stringify(
            selectors[atomOrSelector],
          )}`);

      return str;
    }
    function determineSize(d: any) {
      if (d.data.recoilNodes && d.data.recoilNodes.length) {
        if (d.data.recoilNodes.includes(selectedRecoilValue[0])) {
          return 150;
        }
        return 100;
      }
      return 50;
    }
    function colorComponents(d: any) {
      // if component node contains recoil atoms or selectors, make it orange red or yellow, otherwise keep node gray
      if (d.data.recoilNodes && d.data.recoilNodes.length) {
        if (d.data.recoilNodes.includes(selectedRecoilValue[0])) {
          return 'white';
        }

        let hasAtom = false;
        let hasSelector = false;
        for (let i = 0; i < d.data.recoilNodes.length; i++) {
          if (atoms.hasOwnProperty(d.data.recoilNodes[i])) {
            hasAtom = true;
          }
          if (selectors.hasOwnProperty(d.data.recoilNodes[i])) {
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
};

export default AtomComponentVisual;
