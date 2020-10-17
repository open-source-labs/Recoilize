import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {componentAtomTree} from '../../../types';

interface RankedGraphProps {
  cleanedComponentAtomTree: componentAtomTree;
}


const RankedGraph: React.FC<RankedGraphProps> = ({cleanedComponentAtomTree}: any) => {
  // create an empty array to store objects for property name and actualDuration
  const data: {}[] = [];
  // function to traverse through the fiber tree
  const namesAndDurations = (node: any) => {
    if (node === undefined) return;
    if (node.name && node.actualDuration) {
      const obj: any = {}
      obj["name"] = node.name;
      obj["actualDuration"] = node.actualDuration;
      data.push(obj)
    }
    node.children.forEach((child: any) => namesAndDurations(child))
  }
  namesAndDurations(cleanedComponentAtomTree);

  const svgRef = useRef();
  useEffect(() => {
    const width = document.querySelector('.RankedGraph').clientWidth;
    const height = 375;
    document.getElementById('canvas').innerHTML = '';
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 30, left: 80}
    // set range for y scale 
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.2);
    // set range for x scale
    const x = d3.scaleLinear()
      .range([0, width]);  
    // set range for durations      
    const z = d3.scaleBand()
      .range([height,0])
      .padding(0.2)
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
      .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
     }))
      .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")")
    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, (d: any) => {
       return d.actualDuration; 
      })])
    // Scale the range of the data across the y-axis
    y.domain(data.map((d: any, i) => {
      return d.name + '-' + i;
      }));
    // Scale actualDuration with the y-axis
    z.domain(data.map((d: any) => {
      return d.actualDuration.toFixed(2) + 'ms';
    }))
    // append the rectangles for the bar chart
    svg.selectAll(".bar") 
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .on("mouseover", function() {
        d3.select(this).attr('opacity', '0.85');
        console.log('in the ranked graph function')
        const backgroundConnection = chrome.runtime.connect();
        const barName = 'hello from barName';
        const payload = {
          action: "mouseover",
          payload: barName
        }
        backgroundConnection.postMessage(payload)
      })
      .on("mouseout", function(){
        d3.select(this).attr('opacity', '1');
        const backgroundConnection = chrome.runtime.connect();
        let barName = this.name;
        const payload = {
          action: "mouseout",
          payload: barName
        }
        backgroundConnection.postMessage(payload)
      })
      .transition()
      .duration(750)
      .delay((d: any,i: any) => i * 100)
      .attr("width", function(d: any) {return x(d.actualDuration); } )
      .attr("fill", function(d:any) {
        // return "rgb("+ Math.round(d.actualDuration * 120) + ",0," + Math.round(d.actualDuration * 10) + ")";
        return "rgb("+ "0" + "," + Math.round(d.actualDuration * 130) + "," + Math.round(d.actualDuration * 170) + ")";
      })
      .attr("y", function(d: any, i: any) { return y(d.name + '-' + i)})
      .attr("height", y.bandwidth());
    // add x axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // add y axis to able to have duplicate strings
    const yAxis = d3.axisLeft(y)
      .tickFormat(function(d: any) {
        return d.split("-")[0];
      });
    yAxis(svg.append("g"));
    svg.append('g')
      .call(d3.axisRight(z));
  },[data]);
  
  return (
    <div data-testid='canvas' id='stateGraphContainer'>
      <div className='RankedGraph'>
        <svg id='canvas' ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default RankedGraph;
