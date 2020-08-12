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

    let i = 0;
    let duration: Number = 750;
    let root: any;
    let path: any;

    // creating the tree map
    const treeMap = d3.tree().nodeSize([width, height]);

    //new stuff
    root = d3.hierarchy(componentAtomTree, function (d: any) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source: any) {
      let treeData = treeMap(root);

      let nodes = root.descendants(),
        links = root.descendants().slice(1);

      let node = g
        .selectAll('g.node')
        .attr('stroke', '#646464')
        .attr('stroke-width', 5)
        .data(nodes, function (d: any) {
          return d.id || (d.id = ++i);
        });

      // this tells node where to be placed and go to
      let nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d: any) {
          return `translate(${source.x0}, ${source.y0})`;
        })
        .on('click', click);

      // determines shape/color/size of node
      nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', determineSize)
        .attr('fill', colorComponents);

      nodeEnter
        .append('text')
        .attr('dy', '.31em')
        .attr('x', function (d: any) {
          return d.children || d._children ? -175 : -75;
        })
        .attr('text-anchor', function (d: any) {
          return d.children || d._children ? 'end' : 'start';
        })
        .text(function (d: any) {
          return d.data.name;
        });

      // for each node that got created, append a text element that displays the name of the node
      nodeEnter
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
        .attr('stroke-width', 5);

      let nodeUpdate = nodeEnter.merge(node);

      // transition that makes it slide down to next spot
      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return `translate(${d.x}, ${d.y})`;
        });

      // allows user to see hand pop out when clicking is available and maintains color/size
      nodeUpdate
        .select('circle.node')
        .attr('r', determineSize)
        .attr('fill', colorComponents)
        .attr('cursor', 'pointer');

      let nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return `translate(${source.x}, ${source.y})`;
        })
        .remove();

      nodeExit.select('circle').attr('r', determineSize);

      nodeExit.select('text').style('fill-opacity', 1e-6);

      let link = g.selectAll('path.link').data(links, function (d: any) {
        return d.id;
      });

      let linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('stroke', '#646464')
        .attr('stroke-width', 5)
        .attr('d', function (d: any) {
          let o = {y: source.y0, x: source.x0};
          return diagonal(o, o);
        });

      let linkUpdate = linkEnter.merge(link);

      linkUpdate
        .transition()
        .duration(duration)
        .attr('stroke', '#646464')
        .attr('stroke-width', 5)
        .attr('d', function (d: any) {
          return diagonal(d, d.parent);
        });

      let linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr('stroke', '#646464')
        .attr('stroke-width', 5)
        .attr('d', function (d: any) {
          var o = {x: source.x, y: source.y};
          return diagonal(o, o);
        })
        .remove();

      // makes next Node needed to appear from the previous and not the start
      nodes.forEach(function (d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s: any, d: any) {
        path = `M ${s.x} ${s.y}
          C ${(s.x + d.x) / 2} ${s.y},
            ${(s.x + d.x) / 2} ${d.y},
            ${d.x} ${d.y}`;

        return path;
      }

      function click(d: any) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }

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
