import React, {useState, useRef} from 'react';
import {scaleLinear} from 'd3-scale';
import {interpolate} from 'd3-interpolate';
import {format as d3format} from 'd3-format';
import {hierarchy} from 'd3-hierarchy';
import {Group} from '@vx/group';
import {Partition} from '@vx/hierarchy';
import {useSpring, animated} from 'react-spring';

//determining the number of decimal places displayed
const format = d3format('.2f');

const FlameGraph = ({cleanedComponentAtomTree, width, height}) => {
  //Building a heirarchy for d3 to graph
  const root = hierarchy(cleanedComponentAtomTree)
    //determining tree based duration by summing actual duration of children
    .sum(d => {
      // targets cleanedComponentAtomTree.actualDuration
      return d.actualDuration;
    })
    //sorting children by their tree based duration for graph
    .sort((a, b) => b.value - a.value);
  // this is where we get value for App in this object
  //traversing tree to determine number of nodes
  let totalNodes = 0;
  root.each(() => {
    totalNodes = totalNodes + 1;
    return;
  });

  //calculating average actualDuration of nodes in entire tree
  const averageDiration = root.value / totalNodes;

  //setting margins to fit graphed componets together and fit to container
  const margin = {top: 0, left: 0, right: 0, bottom: 0};

  //scaleLinear outputs a funciton
  //this function is used to determine a graph components color based on actualDuration
  const color = scaleLinear()
    .domain([
      averageDiration / 2,
      averageDiration * 3,
      averageDiration * 6,
      averageDiration * 8,
    ])
    .range(['#ffffff', '#e9c7ff', '#ee9f30', '#ff0000']);

  //initiate graphArea as state variable area, and create setArea funciton
  const [area, setArea] = useState({
    xDomain: [0, width],
    xRange: [0, width],
    yDomain: [0, height],
    yRange: [0, height],
  });

  //define horizontal scaling of graph
  const xScale = useRef(scaleLinear().domain(area.xDomain).range(area.xRange));
  //define vertical scaling of graph
  const yScale = useRef(scaleLinear().domain(area.yDomain).range(area.yRange));

  //set interpolates to allow individual graph components to resize when entire graph resizes
  const xd = interpolate(xScale.current.domain(), area.xDomain);
  const yd = interpolate(yScale.current.domain(), area.yDomain);
  const yr = interpolate(yScale.current.range(), area.yRange);

  //set parameters for zooming animations
  const {t} = useSpring({
    native: true,
    reset: true,
    from: {t: 0},
    to: {t: 1},
    config: {
      mass: 5,
      tension: 500,
      friction: 100,
      precision: 0.00001,
    },
    onFrame: Param => {
      xScale.current.domain(xd(Param.t));
      yScale.current.domain(yd(Param.t)).range(yr(Param.t));
    },
  });

  //return an svg to render the FlameGraph
  return (
    <svg width={width} height={height}>
      <Partition
        top={margin.top}
        left={margin.left}
        root={root}
        size={[height, width]}
        padding={1}
        round={true}>
        {data => (
          <Group>
            {data.descendants().map((node, i) => (
              <animated.g
                transform={t.interpolate(
                  () =>
                    `translate(${xScale.current(node.y0)}, ${yScale.current(
                      node.x0,
                    )})`,
                )}
                key={`node-${i}`}
                onClick={() => {
                  if (
                    node.y0 === area.xDomain[0] &&
                    node.x0 === area.yDomain[0] &&
                    node.parent
                  ) {
                    // If the clicked graph component is already the selected componet, select parent
                    setArea({
                      ...area,
                      xDomain: [node.parent.y0, width],
                      yDomain: [node.parent.x0, node.parent.x1],
                      yRange: [0, height],
                    });
                    // Otherwise select clicked
                  } else {
                    setArea({
                      ...area,
                      xDomain: [node.y0, width],
                      yDomain: [node.x0, node.x1],
                      yRange: [0, height],
                    });
                  }
                }}>
                <animated.rect
                  id={`rect-${i}`}
                  width={t.interpolate(
                    () => xScale.current(node.y1) - xScale.current(node.y0),
                  )}
                  height={t.interpolate(
                    () => yScale.current(node.x1) - yScale.current(node.x0),
                  )}
                  fill={color(node.data.actualDuration)}
                  fillOpacity={1}
                />

                <clipPath id={`clip-${i}`}>
                  <use xlinkHref={`#rect-${i}`} />
                </clipPath>

                <text
                  x={4}
                  y={13}
                  clipPath={`url(#clip-${i})`}
                  style={{
                    font: '10px sans-serif',
                    fontWeight: 'bold',
                  }}>
                  {node.data.name}
                  <tspan
                    style={{
                      fontSize: 9,
                      fillOpacity: 0.8,
                    }}>
                    {' '}
                    {format(node.data.actualDuration)}
                  </tspan>
                </text>
              </animated.g>
            ))}
          </Group>
        )}
      </Partition>
    </svg>
  );
};

export default FlameGraph;
