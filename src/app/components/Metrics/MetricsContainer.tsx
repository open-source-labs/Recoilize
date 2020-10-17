import React, { useState } from 'react';
import { ParentSize } from '@vx/responsive';
import {componentAtomTree} from '../../../types';
import FlameGraph from './FlameGraph.js';
import RankedGraph from './RankedGraph';

interface MetricsProps {
  cleanedComponentAtomTree: componentAtomTree;
}


const Metrics: React.FC<MetricsProps> = ({cleanedComponentAtomTree}) => {
  
  //create state for the graph type toggle
  const [graphType, setGraphType] = useState<boolean>(true);

  //funciton that toggles the graphType state
  const toggleGraphFunc = (flame:boolean): void => {
    flame ? setGraphType(false) : setGraphType(true);
  };

  //function that renders either graphComponent based on graphType state variable
  const determineRender: any = () => {
    if(graphType){
      return(
        //ParentSize component allows us to scale the FlameGraph to fit its container.
        <ParentSize>
          {size =>
            size.ref &&
            <FlameGraph cleanedComponentAtomTree={cleanedComponentAtomTree} width={size.width} height={600} />
          }
        </ParentSize>
      );
    }
    else{
      return(
        <RankedGraph cleanedComponentAtomTree={cleanedComponentAtomTree}/>
      );
    }
  }
  
  //render the toggle buttons and the appropriate graph based on GraphType state variable
  return (
    <div>
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
}


export default Metrics;
