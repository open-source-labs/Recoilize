import React, {useRef, useState, useEffect, Children} from 'react';
import * as d3 from 'd3';
import makeTree from '../../utils/makeTreeConversion';
import {componentAtomTree} from '../../../types';

interface VisualizerProps {
  componentAtomTree: componentAtomTree;
}

const Visualizer: React.FC<VisualizerProps> = ({componentAtomTree}) => {
  // set the heights and width of the tree to be passed into treeMap function
  let width = 0;
  let height = 0;

  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{x, y, k}, setZoomState]: any = useState({x: 0, y: 0, k: 0});

  // data for bar graph render
  const [data, setData] = useState([25, 160, 50, 80, 100, 65, 75, 100]);

  useEffect(() => {
    setZoomState(d3.zoomTransform(d3.select('#canvas').node()));
  }, [componentAtomTree]);

  // this only clears the canvas if Visualizer is already rendered on the extension
  useEffect(() => {
    height = document.querySelector('.Visualizer').clientHeight;
    width = document.querySelector('.Visualizer').clientWidth;
    // document.getElementById('canvas').innerHTML = '';

    // testing bar graph horizontal
    

    // testing bar graph vertical
    const margin = {top: 20, left: 50}

    const svg = d3.select('#canvas');
    const xScale = d3.scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    // x-axis label
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    svg
      .select('.x-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .style('transform', 'translateY(150px)')
      .call(xAxis);
    // y-axis label
    const yAxis = d3.axisRight(yScale);
    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .style('transform', 'translateX(0px)')
      .call(yAxis);
    // create the bars for the graph
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value: any, index:any) => xScale(index))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', '#4682b4')
      .attr('height', (value: any) => 150 - yScale(value));

    const namesAndDurations = (node: any) => {
      // const tagCheck = 0 | 1 | 13;
      if(node.tag === 0 || node.tag === 1 || node.tag === 13){
        console.log('Name: ', node.name, 'Actual Duration: ', node.actualDuration)
      }
      if(!node.children.length) return console.log('No children');
      node.children.forEach((child: any) => namesAndDurations(child))
      return console.log('Done going through children.')
    }

    namesAndDurations(componentAtomTree);


    // creating the main svg container for d3 elements
    // const svgContainer: any = d3
    //   .select('#canvas')
    //   .attr('width', width)
    //   .attr('height', height);

    // // creating a pseudo-class for reusability
    // const g: any = svgContainer
    //   .append('g')
    //   .attr('transform', `translate(${x}, ${y}), scale(${k})`); // sets the canvas to the saved zoomState

    // atomState is the object that is passed into d3.hierarchy
    // const atomState: any = {
    //   name: 'Recoil Root',
    //   // pass in parsed data here
    //   // call the helper function passing in the most recent snapshot
    //   children: makeTree(filteredCurSnap),
    // };

    // creating the tree map
    // const treeMap: any = d3.tree().nodeSize([width, height]);

    // creating the nodes of the tree
    // pass
    // const hierarchyNodes: any = d3.hierarchy(atomState);

    // calling the tree function with nodes created from data
    // const finalMap: any = treeMap(hierarchyNodes);

    // renders a flat array of objects containing all parent-child links
    // renders the paths onto the component
    // let paths: any = finalMap.links();

    // this creates the paths to each atom and its contents in the tree
    // g.append('g')
    //   .attr('fill', 'none')
    //   .attr('stroke', '#646464')
    //   .attr('stroke-width', 5)
    //   .selectAll('path')
    //   .data(paths)
    //   .join('path')
    //   .attr(
    //     'd',
    //     d3
    //       .linkHorizontal()
    //       .x((d: any) => d.y)
    //       .y((d: any) => d.x),
    //   );

    // returns a flat array of objects containing all the nodes and their information
    // renders nodes onto the canvas
    // let nodes: any = hierarchyNodes.descendants();

    // const node is used to create all the nodes
    // this segment places all the nodes on the canvas
    // const node: any = g
    //   .append('g')
    //   .attr('stroke-linejoin', 'round') // no clue what this does
    //   .attr('stroke-width', 1)
    //   .selectAll('g')
    //   .data(nodes)
    //   .join('g')
    //   .attr('transform', (d: any) => `translate(${d.y}, ${d.x})`)
    //   .attr('class', 'atomNodes');

    // for each node that got created, append a circle element
    // node.append('circle').attr('fill', '#c300ff').attr('r', 50);

    // // for each node that got created, append a text element that displays the name of the node
    // node
    //   .append('text')
    //   .attr('dy', '.31em')
    //   .attr('x', (d: any) => (d.children ? -75 : 75))
    //   .attr('text-anchor', (d: any) => (d.children ? 'end' : 'start'))
    //   .text((d: any) => d.data.name)
    //   .style('font-size', `3.5rem`)
    //   .style('fill', 'white')
    //   .clone(true)
    //   .lower()
    //   .attr('stroke', '#646464')
    //   .attr('stroke-width', 2);

    // // adding a mouseOver event handler to each node
    // // only add popup text on nodes with no children
    // // display the data in the node on hover
    // node.on('mouseover', function (d: any, i: number): any {
    //   if (!d.children) {
    //     d3.select(this)
    //       .append('text')
    //       .text(JSON.stringify(d.data, undefined, 2))
    //       .style('fill', 'white')
    //       .attr('x', 75)
    //       .attr('y', 60)
    //       .style('font-size', '4rem')
    //       .attr('stroke', '#646464')
    //       .attr('id', `popup${i}`);
    //   }
    // });

    // // add mouseOut event handler that removes the popup text
    // node.on('mouseout', function (d: any, i: number): any {
    //   d3.select(`#popup${i}`).remove();
    // });

    // allows the canvas to be draggable
    // svg.call(
    //   d3
    //     .drag()
    //     .on('start', dragStarted)
    //     .on('drag', dragged)
    //     .on('end', dragEnded),
    // );

    // // helper functions that help with dragging functionality
    // function dragStarted(): any {
    //   d3.select(this).raise();
    //   g.attr('cursor', 'grabbing');
    // }

    // function dragged(d: any): any {
    //   d3.select(this)
    //     .attr('dx', (d.x = d3.event.x))
    //     .attr('dy', (d.y = d3.event.y));
    // }

    // function dragEnded(): any {
    //   g.attr('cursor', 'grab');
    // }

    // // d3 zoom functionality
    // let zoom = d3.zoom().on('zoom', zoomed);

    // svgContainer.call(
    //   zoom.transform,
    //   // Changes the initial view, (left, top)
    //   d3.zoomIdentity.translate(150, 300).scale(0.3),
    // );

    // // allows the canvas to be zoom-able
    // svgContainer.call(
    //   d3
    //     .zoom()
    //     .scaleExtent([0.05, 0.9]) // [zoomOut, zoomIn]
    //     .on('zoom', zoomed),
    // );

    // // helper function that allows for zooming
    // function zoomed(): any {
    //   g.attr('transform', d3.event.transform);
    // }
  },[data]);
  
  return (
    <div data-testid='canvas' id='stateGraphContainer'>
      <div className='Visualizer'>
        {/* <svg id='canvas'></svg> */}
        <svg id='canvas' className='metrics'>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      </div>
    </div>
  );
};

export default Visualizer;
