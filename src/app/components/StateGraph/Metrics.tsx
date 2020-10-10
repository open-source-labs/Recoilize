import React, { ReactElement, useState } from 'react';
import { hierarchy } from 'd3-hierarchy';
import { ParentSize } from '@vx/responsive';
import {componentAtomTree} from '../../../types';
import IcicleVertical from './IcicleVertical.js';
import Visualizer from './Visualizer';

interface MetricsProps {
  componentAtomTree: componentAtomTree;
}

interface hierarchyNode {
  children: hierarchyNode;
  data: componentAtomTree;
  depth: number;
  height: number;
  parent: hierarchyNode;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

const cleanComponentAtomTree = (
  inputObj: componentAtomTree,
): componentAtomTree => {
  const obj = {} as componentAtomTree;
  let counter = 0;
  const innerClean = (inputObj: any, outputObj: any, counter: number = 0) => {
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
        const deepCopy: componentAtomTree = JSON.parse(
          JSON.stringify(inputObj),
        );
        deepCopy.children = [];
        outputObj.push(deepCopy);
        if (outputObj.length > 1) {
          outputObj = outputObj[outputObj.length - 1].children;
        } else {
          outputObj = outputObj[0].children;
        }
      }
    }
    // recursive call running through the whole component atom tree -- understand this better
    for (let i = 0; i < inputObj.children.length; i++) {
      innerClean(inputObj.children[i], outputObj, counter);
    }
    return outputObj;
  };
  innerClean(inputObj, obj, counter);
  // returning the new object that we create
  return obj;
};





const Metrics: React.FC<MetricsProps> = ({componentAtomTree}) => {
  //create state for the graph type toggle
  const [graphType, setGraphType] = useState<boolean>(true);

  const cleanedTree: any = cleanComponentAtomTree(componentAtomTree);

  let sum = (x: number, y: number): number => {
    return x + y;
  }

  const toggleGraphFunc = (ranked:boolean): void => {
    ranked ? setGraphType(false) : setGraphType(true);
  };

  const determineRender: any = () => {
    if(graphType){
      return(
        <ParentSize>
          {size =>
            size.ref &&
            <IcicleVertical root={root} width={size.width} height={600} />
          }
        </ParentSize>
      );
    }
    else{
      return(
        //return the bar graph component
        <Visualizer componentAtomTree={componentAtomTree}/>
      );
    }
  }
  // const determineText: any = () => {
  //   if(graphType){
  //     return(
  //       <div>"Displaying render times of components + children"</div>
  //     );
  //   }
  //   else{
  //     return(
  //       <div>"Displaying render times of individual components"</div>
  //     );
  //   }
  // }

  const graph: any = determineRender();

  const root: any = hierarchy(cleanedTree)
  .eachBefore(
    d => (d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name)
  )
  .sum(d => d.actualDuration)
  .sort((a, b) => b.value - a.value);

  return (
    <div>
      <div className="persistContainer">
        {/* <label className="switch" htmlFor="checkbox">
          <input
            data-testid="stateSettingsToggle"
            id="checkbox"
            type="checkbox"
            checked={graphType}
            onChange={toggleGraphFunc}></input>
          <div className="slider round" />{' '}
        </label>
        <span className="persistText">Toggle Graph Type</span> */}
        <button
          className="timeTravelButton"
          onClick={() => {
            toggleGraphFunc(false);
          }}>
          Flame Graph
        </button>
        <button
          className="timeTravelButton"
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