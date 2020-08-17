import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import {componentAtomTree, atom, selector} from '../../../types';
import {string} from 'prop-types';

interface AtomComponentVisualProps {
  componentAtomTree: componentAtomTree;
  selectedRecoilValue: any[];
  atoms: atom;
  selectors: selector;
  setStr: any;
}

const AtomComponentVisual: React.FC<AtomComponentVisualProps> = ({
  componentAtomTree,
  selectedRecoilValue,
  atoms,
  selectors,
  setStr,
}) => {
  // set the heights and width of the tree to be passed into treeMap function
  let width = 0;
  let height = 0;

  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{x, y, k}, setZoomState] = useState({x: 0, y: 0, k: 0});

  // useState hook to update the toggle of showing diff components
  const [rawToggle, setRawToggle] = useState(false);

  // useEffect(() => {
  //   setZoomState(d3.zoomTransform(d3.select('#canvas').node()));
  // }, [componentAtomTree, selectedRecoilValue]);

  //! clean the componentatomtree to only have the data that we want
  // console.log('tree: ', componentAtomTree);
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
    height = document.querySelector('.Component').clientHeight;
    width = document.querySelector('.Component').clientWidth;

    // console.log('width, height: ', width, ' ', height);
    document.getElementById('canvas').innerHTML = '';

    // creating the main svg container for d3 elements
    const svgContainer = d3.select('#canvas');
    // .on('dblclick.zoom', console.log('this is where we would put null'));

    // creating a pseudo-class for reusability
    const g = svgContainer
      .append('g')
      .attr('transform', `translate(${x}, ${y}), scale(${k})`)
      .attr('id', 'componentGraph');

    let i = 0;
    let duration: Number = 750; //change to 1 so its super fast and looks like no re render
    let root: any;
    let path: any;

    // creating the tree map
    const treeMap = d3.tree().nodeSize([height, width]);

    if (!rawToggle) {
      root = d3.hierarchy(rawComponentAtomTree, function (d: any) {
        return d.children;
      });
    } else {
      root = d3.hierarchy(componentAtomTree, function (d: any) {
        return d.children;
      });
    }
    root.x0 = 10;
    root.y0 = width / 2;

    update(root);

    /* LEAVE THE ZOOM STUFF OUTSIDE OF THE UPDATE() */
    let zoom = d3.zoom().on('zoom', zoomed);

    svgContainer.call(
      zoom.transform,
      // Changes the initial view, (left, top)
      d3.zoomIdentity.translate(50, 380).scale(0.07),
    );

    // allows the canvas to be zoom-able
    svgContainer.call(
      d3
        .zoom()
        .scaleExtent([0.05, 0.9]) // [zoomOut, zoomIn]
        .on('zoom', zoomed),
      // .on('zoom.multiple', () => d3.event.preventDefault()),
    );

    // helper function that allows for zooming
    function zoomed(d: any) {
      g.attr('transform', d3.event.transform);
    }
    /* LEAVE THE ZOOM STUFF OUTSIDE OF THE UPDATE() */

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
          const atsel: any = [];
          if (d.data.recoilNodes) {
            for (let x = 0; x < d.data.recoilNodes.length; x++) {
              atsel.push(d.data.recoilNodes[x]);
            }
            d3.select(this)
              .append('text')
              .text(formatAtomSelectorText(atsel))
              .style('fill', 'white')
              // Figure out the best way to center the text under the node or otherwise place it
              .attr('x', formatMouseoverXValue(d.data.recoilNodes[x]))
              .attr('y', 200 + x * 55)
              .style('font-size', '3.5rem')
              .attr('id', `popup${i}${x}`);
          }
          // console.log('atsel: ', atsel);
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
        const atsel = [];
        if (d.data.recoilNodes) {
          for (let x = 0; x < d.data.recoilNodes.length; x++) {
            atsel.push(d.data.recoilNodes[x]);
          }
          setStr(formatAtomSelectorText(atsel));
        }
      }

      // allows the canvas to be draggable
      node.call(
        d3
          .drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
      );

      // helper functions that help with dragging functionality
      function dragStarted() {
        console.log('drag start');
        // d3.select(this).g.attr('cursor', 'grabbing');
      }

      function dragged(d: any) {
        console.log('dragging');
        // d3.select(this)
        //   .attr('dx', (d.x = d3.event.x))
        //   .attr('dy', (d.y = d3.event.y));
      }

      function dragEnded() {
        console.log('drag end');
        // g.attr('cursor', 'grab');
      }

      function formatMouseoverXValue(recoilValue: any) {
        if (atoms.hasOwnProperty(recoilValue)) {
          return -300;
        }
        return -425;
      }

      function formatAtomSelectorText(atomOrSelector: any) {
        let strings = [];
        // console.log('atoms:', atoms);
        for (let i = 0; i < atomOrSelector.length; i++) {
          if (atoms.hasOwnProperty(atomOrSelector[i])) {
            strings.push(
              `ATOM ${atomOrSelector[i]}: ${JSON.stringify(
                atoms[atomOrSelector[i]],
              )}`,
            );
          } else if (selectors.hasOwnProperty(atomOrSelector[i])) {
            strings.push(
              `SELECTOR ${atomOrSelector[i]}: ${JSON.stringify(
                selectors[atomOrSelector[i]],
              )}`,
            );
          }
        }
        return strings;
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

      /* The bounding box only covers the first node (421 and 422) so the box is tiny
       * Gotta figure out how to properly get the entire bounding box for the whole graph
       */

      // const boundBox = d3.select('#componentGraph').node().getBBox();
      // // Makes an HTML div element that represents the bounding box
      // const makeHTMLBox = (el: any) => {
      //   const htmlBox = document.createElement('div');
      //   htmlBox.id = 'htmlBox';
      //   htmlBox.style.bottom = `${el.bottom}px`;
      //   htmlBox.style.height = `${el.height}px`;
      //   htmlBox.style.width = `${el.width}px`;
      //   htmlBox.style.left = `${el.left}px`;
      //   htmlBox.style.right = `${el.right}px`;
      //   htmlBox.style.top = `${el.top}px`;
      //   htmlBox.style.backgroundColor = 'white';
      //   htmlBox.style.zIndex = '5';
      //   return htmlBox;
      // };
      // const gBoundBox = makeHTMLBox(boundBox);
      // document.querySelector('.AtomComponentVisual').appendChild(gBoundBox);

      // console.log('bound box: ', d3.select('#componentGraph').node().getBBox());

      // const gBox = d3.select('#componentGraph').node().getBBox();
      // function zoomFit(paddingPercent?: Number, transitionDuration?: Number) {
      //   const bounds = gBox;
      //   const parent = d3.select('#componentGraph').node().parentElement;
      //   const fullWidth = parent.clientWidth;
      //   const fullHeight = parent.clientHeight;
      //   const width = bounds.width;
      //   const height = bounds.height;
      //   const midX = bounds.x + width / 2;
      //   const midY = bounds.y + height / 2;
      //   if (width === 0 || height === 0) return;
      //   const scale = Number(
      //     paddingPercent ||
      //       0.75 / Math.max(width / fullWidth, height / fullHeight),
      //   );
      //   const translate = [
      //     fullWidth / 2 - scale * midX,
      //     fullHeight / 2 - scale * midY,
      //   ];

      //   console.trace('zoomFit', translate, scale);
      //   console.log('bounds: ', bounds);
      //   console.log('fullSize: ', [fullWidth, fullHeight]);
      //   d3.select('#canvas')
      //     .transition()
      //     .duration(transitionDuration || 0)
      //     .call(
      //       zoom.transform,
      //       d3.zoomIdentity.translate(translate).scale(scale).event,
      //     );
      // }
      // zoomFit(0.95, 500);
    }
  }, [componentAtomTree, rawToggle]);

  return (
    <div className="AtomComponentVisual">
      <svg id="canvas"></svg>
      {/* <button
        id="zoomFit"
        style={{
          color: '#989898',
        }}>
        <span>Fit</span>
      </button> */}
      <button
        id="fixedButton"
        style={{
          color: rawToggle ? '#E6E6E6' : '#989898',
        }}
        onClick={() => {
          setRawToggle(!rawToggle);
        }}>
        <span>{rawToggle ? 'Collapse' : 'Expand'}</span>
      </button>
    </div>
  );
};

export default AtomComponentVisual;
