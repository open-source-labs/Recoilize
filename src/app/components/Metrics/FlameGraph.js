import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleSequential } from 'd3-scale';
import { interpolate as d3interpolate, quantize } from 'd3-interpolate';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { format as d3format } from 'd3-format';
import { hierarchy } from 'd3-hierarchy';
import { Group } from '@vx/group';
import { Partition } from '@vx/hierarchy';
import { useSpring, animated } from 'react-spring';


// const color = scaleOrdinal().range([
//   "#FE938C",
//   "#E6B89C",
//   "#EAD2AC",
//   "#9CAFB7",
//   "#4281A4",
// ]);
// const color = scaleOrdinal(schemeCategory20c);
const format = d3format('.2f');

const IcicleVertical = (props) => {

  const {
    cleanedComponentAtomTree,
    width,
    height,
  } = props;

  const root = hierarchy(cleanedComponentAtomTree)
  .eachBefore(
    d => (d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name)
  )
  .sum(d => d.actualDuration)
  .sort((a, b) => b.value - a.value);

  let totalDuration = 0;
  root.each(() => {
    totalDuration = totalDuration + 1;
    return;
  });

  // console.log("Number of components", total);
  // console.log('Total time', root.value);
  // console.log('Average time', root.value/total);

  const averageDiration = root.value/totalDuration;


  const margin = { top: 0, left: 0, right: 0, bottom: 0 }

  // const color = scaleOrdinal(
  //   quantize(interpolateRainbow, root.children.length + 1)
  // );
  console.log(averageDiration);
  const color = scaleLinear()
  .domain([averageDiration/2, averageDiration * 2, averageDiration * 3, averageDiration * 4, averageDiration * 5])
  .range(["#ffffff","#e9c7ff", "#f95cb3", "#ee9f30", "#ff0000"])
  // const color = scaleLinear()
  // .domain([0, averageDiration, averageDiration * 2, averageDiration * 4, averageDiration * 6])
  // .range(["#4281A4","#9CAFB7", "#EAD2AC", "#E6B89C", "#FE938C" ])
  // var color = scaleSequential(d3.interpolateBlues)
  //   .domain([0, averageDiration * 5])

  const [state, setState] = useState({
    xDomain: [0, props.width],
    xRange: [0, props.width],
    yDomain: [0, props.height],
    yRange: [0, props.height]
  });

  const xScale = useRef(
    scaleLinear()
      .domain(state.xDomain)
      .range(state.xRange)
  );
  const yScale = useRef(
    scaleLinear()
      .domain(state.yDomain)
      .range(state.yRange)
  );

  const xd = d3interpolate(xScale.current.domain(), state.xDomain);
  const yd = d3interpolate(yScale.current.domain(), state.yDomain);
  const yr = d3interpolate(yScale.current.range(), state.yRange);

  const { t } = useSpring({
    native: true,
    reset: true,
    from: { t: 0 },
    to: { t: 1 },
    config: {
      mass: 5,
      tension: 500,
      friction: 100,
      precision: 0.00001
    },
    onFrame: (Param) => {
      xScale.current.domain(xd(Param.t));
      yScale.current.domain(yd(Param.t)).range(yr(Param.t));
    }
  });

  return (
    <svg width={width} height={height}>
      <Partition
        top={margin.top}
        left={margin.left}
        root={root}
        size={[height, width]}
        padding={1}
        round={true}
      >
        {data => (
          <Group>
            {data.descendants().map((node, i) => (
              <animated.g
                transform={t.interpolate(
                  () =>
                    `translate(${xScale.current(node.y0)}, ${yScale.current(
                      node.x0
                    )})`
                )}
                key={`node-${i}`}
                onClick={() => {
                  if (
                    node.y0 === state.xDomain[0] &&
                    node.x0 === state.yDomain[0] &&
                    node.parent
                  ) {
                    // Already selected, use parent
                    setState({
                      ...state,
                      xDomain: [node.parent.y0, props.width],
                      yDomain: [node.parent.x0, node.parent.x1],
                      yRange: [0, props.height]
                    });
                  } else {
                    setState({
                      ...state,
                      xDomain: [node.y0, props.width],
                      yDomain: [node.x0, node.x1],
                      yRange: [0, props.height]
                    });
                  }
                }}
              >
                <animated.rect
                  id={`rect-${i}`}
                  width={t.interpolate(
                    () => xScale.current(node.y1) - xScale.current(node.y0)
                  )}
                  height={t.interpolate(
                    () => yScale.current(node.x1) - yScale.current(node.x0)
                  )}
                  fill={
                    // node.children
                    //   ? '#ddd'
                    //   : color(node.data.id.split('.').slice(0, 2))
                    // node.data.actualDuration > 2 ? '#ddd' : '#A51CA4'
                    color(node.data.actualDuration)
                  }
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
                    fontWeight: 'bold'
                  }}
                >
                  {node.data.name}
                  <tspan
                    style={{
                      fontSize: 9,
                      fillOpacity: 0.8
                    }}
                  >
                    {' '}
                    {format(node.value)}
                  </tspan>
                </text>
              </animated.g>
            ))}
          </Group>
        )}
      </Partition>
    </svg>
  );
}

export default IcicleVertical;
