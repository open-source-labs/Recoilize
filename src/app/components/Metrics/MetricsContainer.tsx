import React, {useState} from 'react';
import {ParentSize} from '@vx/responsive';
import {dataDurationArr} from '../../../types';
import FlameGraph from './FlameGraph.js';
import RankedGraph from './RankedGraph';
import {useAppSelector} from '../../state-management/hooks';

const Metrics: React.FC = () => {
  const cleanedComponentAtomTree = useAppSelector(
    state => state.snapshot.cleanComponentAtomTree,
  );
  //create state for the graph type toggle
  const [graphType, setGraphType] = useState<boolean>(true);

  //funciton that toggles the graphType state
  const toggleGraphFunc = (flame: boolean): void => {
    flame ? setGraphType(false) : setGraphType(true);
  };

  // create an empty array to store objects for property name and actualDuration for rankedGraph
  const dataDurationArr: dataDurationArr = [];
  let length = 0;
  // function to traverse through the fiber tree
  const namesAndDurations = (node: any) => {
    if (node === undefined) return;
    if (node.name && node.actualDuration) {
      const obj: any = {};
      if (node.name.length > length) {
        length = node.name.length;
      }
      obj['name'] = node.name;
      obj['actualDuration'] = node.actualDuration;
      dataDurationArr.push(obj);
    }
    node.children.forEach((child: any) => namesAndDurations(child));
  };
  namesAndDurations(cleanedComponentAtomTree);

  //function that renders either graphComponent based on graphType state variable
  const determineRender: any = () => {
    if (graphType) {
      return (
        //ParentSize component allows us to scale the FlameGraph to fit its container.
        <ParentSize>
          {size =>
            size.ref && (
              <FlameGraph
                cleanedComponentAtomTree={cleanedComponentAtomTree}
                width={size.width}
                height={600}
              />
            )
          }
        </ParentSize>
      );
    } else {
      return (
        <ParentSize>
          {size =>
            size.ref && (
              <RankedGraph
                data={dataDurationArr}
                width={size.width}
                height={size.height}
              />
            )
          }
        </ParentSize>
      );
    }
  };

  //render the toggle buttons and the appropriate graph based on GraphType state variable
  return (
    <div id="metricsWrapper">
      <div data-testid="canvas" className="graphContainer">
        <button
          className="graphButton"
          autoFocus={true}
          onClick={() => {
            toggleGraphFunc(false);
          }}>
          Flame Graph
        </button>
        <button
          className="graphButton"
          onClick={() => {
            toggleGraphFunc(true);
          }}>
          Ranked Graph
        </button>
      </div>
      {determineRender()}
    </div>
  );
};

export default Metrics;
