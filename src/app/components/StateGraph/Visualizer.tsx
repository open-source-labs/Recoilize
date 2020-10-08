import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {componentAtomTree} from '../../../types';

interface VisualizerProps {
  componentAtomTree: componentAtomTree;
}
// Recursive function that will run through componentatomtree, filter out unecessary nodes, and create the new object appropriately
const cleanComponentAtomTree = (
  inputObj: componentAtomTree,
  ): componentAtomTree => {
    const obj = {} as componentAtomTree;
    let counter = 0;
    const innerClean = (inputObj: any, outputObj: any, counter: number = 0) => {
      if (
        inputObj.tag === 0 &&
        inputObj.name !== 'RecoilRoot' &&
        inputObj.name !== 'Batcher' &&
        inputObj.name !== 'RecoilizeDebugger' &&
        inputObj.name !== 'CssBaseline'
      ) {
        // if the obj is empty, we do this
        if (Object.keys(obj).length === 0) {
          outputObj.children = [];
          outputObj.name = inputObj.name;
          outputObj.recoilNodes = inputObj.recoilNodes;
          outputObj.tag = inputObj.tag;
          outputObj = outputObj.children;
        }
        // create another conditional
        else {
          const deepCopy: componentAtomTree = JSON.parse(
            JSON.stringify(inputObj),
          );
          deepCopy.children = [];
          outputObj.push(deepCopy);
          if (outputObj.length > 1) {
            outputObj = outputObj[outputObj.length - 1].children;
          } else {
            outputObj = outputObj[0].children;
          }
        }
      }
      // recursive call running through the whole component atom tree -- understand this better
      for (let i = 0; i < inputObj.children.length; i++) {
        innerClean(inputObj.children[i], outputObj, counter);
      }
      return outputObj;
    };
    innerClean(inputObj, obj, counter);
    // returning the new object that we create
    return obj;
  };

const Visualizer: React.FC<VisualizerProps> = ({componentAtomTree}: any) => {
  // data for bar graph render
  const rawComponentAtomTree = cleanComponentAtomTree(componentAtomTree);
  // create an empty array to store objects for property name and actualDuration
  let dataArray: {}[] = [];
  // function to traverse through the fiber tree
  const namesAndDurations = (node: any) => {
    // const tagCheck = 0 | 1 | 13;
    if(node.tag === 0 || node.tag === 1 || node.tag === 13){
      if (node.name && node.actualDuration) {
        const obj: any = {}
        obj["name"] = node.name;
        obj["actualDuration"] = node.actualDuration;
        dataArray.push(obj)
      } 
    }
    node.children.forEach((child: any) => namesAndDurations(child))
  }
  namesAndDurations(rawComponentAtomTree);

  const data = dataArray;

  const svgRef = useRef();
  useEffect(() => {
    const widthx = document.querySelector('.Visualizer').clientWidth;
    // let heightx = document.querySelector('.Visualizer').clientHeight;
    document.getElementById('canvas').innerHTML = '';
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = widthx - margin.left - margin.right,
        height = 340 - margin.top - margin.bottom;
    // set range for y scale
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.2);
    // set range for x scale
    const x = d3.scaleLinear()
      .range([0, width]);            
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select(svgRef.current)
      .classed("svg-container", true)
      .append('svg')
      .attr('class', 'chart')
      .attr("viewBox", "0 0 600 490")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");
    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d: any){ return d.actualDuration; }) + 0.2])
    // Scale the range of he data across the y-axis
    y.domain(data.map(function(d: any) { return d.name; }));
    // append the rectangles for the bar chart
    svg.selectAll(".bar") 
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("width", function(d: any) {return x(d.actualDuration); } )
      .attr("y", function(d: any) { return y(d.name); })
      .attr("height", y.bandwidth());
    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  },[data]);
  
  return (
    <div data-testid='canvas' id='stateGraphContainer'>
      <div className='Visualizer'>
        <svg id='canvas' ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default Visualizer;
