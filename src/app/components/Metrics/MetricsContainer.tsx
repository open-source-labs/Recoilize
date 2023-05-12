import React, {useState} from 'react';
import {ParentSize} from '@vx/responsive';
import {dataDurationArr} from '../../../types';
import FlameGraph from './FlameGraph.js';
import RankedGraph from './RankedGraph';
import ComparisonGraph from './ComparisonGraph';
import {useAppSelector} from '../../state-management/hooks';

const Metrics: React.FC = () => {
  const cleanedComponentAtomTree = useAppSelector(
    state => state.snapshot.cleanComponentAtomTree,
  );
  //create state for the graph type toggle
  const [graphType, setGraphType] = useState<string>('flame');

  //funciton that toggles the graphType state
  const toggleGraphFunc = (check: string): void => {
    if (check === 'flame') setGraphType('flame');
    if (check === 'ranked') setGraphType('ranked');
    if (check === 'comparison') setGraphType('comparison');
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
    if (graphType === 'flame') {
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
    } else if (graphType === 'ranked') {
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
    } else if (graphType === 'comparison') {
      return (
        <ParentSize>
          {size =>
            size.ref && (
              <ComparisonGraph
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
            toggleGraphFunc('flame');
          }}
        >
          Flame Graph
        </button>
        <button
          className="graphButton"
          onClick={() => {
            toggleGraphFunc('ranked');
          }}
        >
          Ranked Graph
        </button>
        <button
          className="graphButton"
          onClick={() => {
            toggleGraphFunc('comparison');
          }}
        >
          Comparison Graph
        </button>
      </div>
      {determineRender()}
    </div>
  );
};

export default Metrics;
