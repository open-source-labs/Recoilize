import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {dataDurationArr} from '../../../types';
import {useAppSelector} from '../../state-management/hooks';

interface ComparisonGraphProps {
  data: dataDurationArr; // an array of object{name:, actualDuration}
  width?: number;
  height?: number;
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({
  data,
  width,
  height,
}: ComparisonGraphProps) => {
  const snapshotHistory = useAppSelector(
    (state: {snapshot: {snapshotHistory: any}}) =>
      state.snapshot.snapshotHistory,
  );
  console.log('comparison snapshot ', snapshotHistory);
  // declare an array that holds 2 objects: past and current
  const displayData = [
    {name: 'past', duration: 0},
    {name: 'current', duration: 0},
  ];

  // retrieve and get total duration for past serie from the local storage
  const values: any[] = [];
  const keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    const series = localStorage.getItem(keys[i]);
    values.push(JSON.parse(series));
  }
  for (const element of values) {
    displayData[0].duration += element.componentAtomTree.treeBaseDuration;
  }

  let total = 0;
  for (const element of snapshotHistory) {
    total += element.componentAtomTree.treeBaseDuration;
  }
  displayData[1].duration = total;
  // delete series in local storage
  const deleteSeries = () => {
    for (const i of keys) {
      localStorage.removeItem(i);
    }
  };

  // svg
  const svgRef = useRef();
  useEffect(() => {
    document.getElementById('canvas').innerHTML = '';
    // set the dimensions and margins of the graph
    let left = 80;
    if (length > 13) {
      left = 100;
    }
    if (length > 17) {
      left = 120;
    }

    const margin = {top: 20, right: 20, bottom: 30, left};
    // set range for y scale
    const y = d3.scaleBand().range([height, 0]).padding(0.2);
    // set range for x scale
    const x = d3.scaleLinear().range([0, width * 0.8]);
    // set range for durations
    const z = d3.scaleBand().range([height, 0]).padding(0.2);
    // determines the color based on actualDuration
    function colorPicker(data: any) {
      if (data <= 1) return '#51a8f0';
      else if (data <= 2) return '#3a7bb0';
      else return '#2d608a';
    }
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select(svgRef.current)
      .classed('svg-container', true)
      .append('svg')
      .attr('class', 'chart')
      .attr('viewBox', '-100 0 900 600')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .classed('svg-content-responsive', true)
      .call(
        d3.zoom().on('zoom', function () {
          svg.attr('transform', d3.event.transform);
        }),
      )
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // Scale the range of the data in the domain
    x.domain([
      0,
      d3.max(displayData, (d: any) => {
        return d.duration;
      }),
    ]);
    // Scale the range of the data across the y-axis
    y.domain(
      displayData.map((d: any, i) => {
        return d.name + '-' + i;
      }),
    );
    // Scale actualDuration with the y-axis
    z.domain(
      displayData.map((d: any, i) => {
        return d.duration.toFixed(2) + 'ms' + '-' + i;
      }),
    );
    // append the rectangles for the bar chart
    svg
      .selectAll('.bar')
      .data(displayData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .on('mouseover', function () {
        d3.select(this).attr('opacity', '0.85');
        const backgroundConnection = chrome.runtime.connect();
        const barName = this.data;
        const payload = {
          action: 'mouseover',
          tabId: chrome.devtools.inspectedWindow.tabId,
          payload: barName,
        };
        backgroundConnection.postMessage(payload);
      })
      // .transition()
      // .duration(1300)
      // .delay((d: any,i: any) => i * 100)
      .attr('width', function (d: any) {
        return x(d.duration);
      })
      .attr('fill', function (d: any) {
        return colorPicker(d.duration);
      })
      .attr('y', function (d: any, i: any) {
        return y(d.name + '-' + i);
      })
      .attr('height', y.bandwidth());
    // add x axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
    // add y axis to able to have duplicate strings
    const yAxis = d3.axisLeft(y).tickFormat(function (d: any) {
      return d.split('-')[0];
    });
    yAxis(svg.append('g'));
    // add z axis to display all duration times
    const zAxis = d3.axisRight(z).tickFormat(function (d: any) {
      return d.split('-')[0];
    });
    zAxis(svg.append('g'));
    // svg.append('g')
    //   .call(d3.axisRight(z));
  }, [data]);

  return (
    <div data-testid="canvas" id="stateGraphContainer">
      <button
        id="docs_button"
        onClick={() => {
          deleteSeries();
        }}>
        Delete Series
      </button>
      <svg id="canvas" ref={svgRef}></svg>
    </div>
  );
};

export default ComparisonGraph;
