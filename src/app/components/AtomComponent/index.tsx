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

  // useState hook to update the toggle of showing diff components
  const [rawToggle, setRawToggle] = useState(false);

  useEffect(() => {
    setZoomState(d3.zoomTransform(d3.select('#canvas').node())); // <------------------ LOOK INTO THIS TO SEE HOW TO GET IT TO STOP RE EXPANDING
  }, [componentAtomTree, selectedRecoilValue]);

  //! clean the componentatomtree to only have the data that we want
  const cleanComponentAtomTree = (inputObj: any) => {
    const obj = {} as any;
    let counter = 0;
    // Create a recursive function that will run through the component atom tree, change the children to what we want
    const innerClean = (inputObj: any, outputObj: any, counter = 0) => {
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
          const deepCopy = JSON.parse(JSON.stringify(inputObj));
          deepCopy.children = [];
          outputObj.push(deepCopy);
          if (outputObj.length > 1) {
            outputObj = outputObj[outputObj.length - 1].children;
          } else {
            outputObj = outputObj[0].children;
          }
        }
      }
      // ! recursive call running through the whole component atom tree -- understand this better
      for (let i = 0; i < inputObj.children.length; i++) {
        innerClean(inputObj.children[i], outputObj, counter);
      }
      return outputObj;
    };
    innerClean(inputObj, obj, counter);
    // returning the new object that we create
    return obj;
  };
  let rawComponentAtomTree = cleanComponentAtomTree(componentAtomTree);

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
      .attr('transform', `translate(${x}, ${y}), scale(${k})`);

    let i = 0;
    let duration: Number = 750; //change to 1 so its super fast and looks like no re render
    let root: any;
    let path: any;

    // creating the tree map
    const treeMap = d3.tree().nodeSize([width, height]);

    if (!rawToggle) {
      root = d3.hierarchy(rawComponentAtomTree, function (d: any) {
        return d.children;
      });
    } else {
      root = d3.hierarchy(componentAtomTree, function (d: any) {
        return d.children;
      });
    }
    root.x0 = 0;
    root.y0 = width / 2;

    update(root);

    function update(source: any) {
      let treeData = treeMap(root);

      let nodes = root.descendants(),
        links = root.descendants().slice(1);

      let node = g
        .selectAll('g.node')
        .attr('stroke-width', 5)
        .data(nodes, function (d: any) {
          return d.id || (d.id = ++i);
        });

      // this tells node where to be placed and go to
      // adding a mouseOver event handler to each node
      // display the data in the node on hover
      // add mouseOut event handler that removes the popup text
      let nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d: any) {
          return `translate(${source.y0}, ${source.x0})`;
        })
        .on('click', click)
        .on('mouseover', function (d: any, i: any) {
          if (d.data.recoilNodes) {
            for (let x = 0; x < d.data.recoilNodes.length; x++) {
              d3.select(this)
                .append('text')
                .text(formatAtomSelectorText(d.data.recoilNodes[x]))
                .style('fill', 'white')
                .attr('x', formatMouseoverXValue(d.data.recoilNodes[x]))
                .attr('y', 200 + x * 55)
                .style('font-size', '3.5rem')
                .attr('id', `popup${i}${x}`);
            }
          }
        })
        .on('mouseout', function (d: any, i: any) {
          for (let x = 0; x < d.data.recoilNodes.length; x++) {
            d3.select(`#popup${i}${x}`).remove();
          }
        });

      // determines shape/color/size of node
      nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', determineSize)
        .attr('fill', colorComponents);

      // for each node that got created, append a text element that displays the name of the node
      nodeEnter
        .append('text')
        .attr('dy', '.31em')
        .attr('y', (d: any) => (d.data.recoilNodes ? 138 : -75))
        .attr('text-anchor', function (d: any) {
          return d.children || d._children ? 'middle' : 'middle';
        })
        .text((d: any) => d.data.name)
        .style('font-size', `4.5rem`)
        .style('fill', 'white')
        .clone(true)
        .lower();

      let nodeUpdate = nodeEnter.merge(node);

      // transition that makes it slide down to next spot
      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return `translate(${d.y}, ${d.x})`;
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
          return `translate(${source.y}, ${source.x})`;
        })
        .remove();

      nodeExit.select('circle').attr('r', determineSize);

      nodeExit.select('text').style('fill-opacity', 1e-6);

      let link = g
        .attr('fill', 'none')
        .attr('stroke-width', 5)
        .selectAll('path.link')
        .data(links, function (d: any) {
          return d.id;
        });

      let linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('stroke', '#646464')
        .attr('stroke-width', 5)
        .attr('d', function (d: any) {
          let o = {x: source.x0, y: source.y0};
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
          let o = {y: source.y, x: source.x};
          return diagonal(o, o);
        })
        .remove();

      // makes next Node needed to appear from the previous and not the start
      nodes.forEach(function (d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s: any, d: any) {
        path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

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

      // allows the canvas to be draggable
      node.call(
        d3
          .drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
      );
    }

    let zoom = d3.zoom().on('zoom', zoomed);

    // allows the canvas to be zoom-able
    svgContainer.call(
      d3
        .zoom()
        .extent([
          [width, height],
          [width, height],
        ])
        .scaleExtent([0.1, 0.7])
        .on('zoom', zoomed),
    );

    svgContainer.call(
      zoom.transform,
      d3.zoomIdentity.translate(100, 300).scale(0.4),
    );

    // helper functions that help with dragging functionality
    function dragStarted() {
      d3.select(this).g.attr('cursor', 'grabbing');
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
    function zoomed(d: any) {
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
        <button
          id="fixedButton"
          style={{color: rawToggle ? '#E6E6E6' : '#989898'}}
          onClick={() => {
            setRawToggle(!rawToggle);
          }}>
          Raw
        </button>
      </div>
    </div>
  );
};

export default AtomComponentVisual;
