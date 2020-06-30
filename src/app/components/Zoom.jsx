import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

function Zoom() {
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });

  useEffect(() => {
    const selection = d3.select('#canvas');
    const zoom = d3.zoom().on('zoom', function () {
      setTransform(d3.event.transform);
    });
    selection.call(zoom).on('dblclick.zoom', null);
    return () => selection.on('.zoom', null);
  });

  return <g transform={`translate(${x}, ${y}) scale(${k})`}></g>;
}

export default Zoom;
