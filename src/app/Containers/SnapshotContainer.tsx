import React, {useEffect, useContext, useState, useRef} from 'react';
import SnapshotsList from '../components/SnapshotList/SnapshotList';
import {renderIndexContext} from './MainContainer';
import {useSelector} from 'react-redux';
import {selectFilterState} from '../state-management/slices/FilterSlice';
import {snapshotHistoryContext, selectedContext} from '../components/App';

const SnapshotsContainer: React.FC = () => {
  const {snapshotHistory} = useContext(snapshotHistoryContext);
  // const {renderIndex} = useContext(renderIndexContext);
  // const {filter} = useContext(filterContext);
  const [renderIndex, setRenderIndex] = useState(snapshotHistory.length - 1);
  const filterData = useSelector(selectFilterState);
  const {selected} = useContext(selectedContext);
  const snapshotEndRef = useRef<HTMLDivElement>(null);
  let snapshotHistoryLength = snapshotHistory.length

  // useEffect to scroll bottom whenever snapshot history changes
  useEffect(() => {
    scrollToBottom();
  }, [snapshotHistoryLength]);

  // using scrollInToView makes a smoother scroll
  const scrollToBottom = (): void => {
    snapshotEndRef.current.scrollIntoView({behavior: 'smooth'});
  };

  const snapshotDivs: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory
  for (let i = 0; i < snapshotHistoryLength; i++) {
    
    // filterFunc will return false if there is no change to state
    const filterFunc = (): boolean => {
    
      // don't use the counter for this, not reliable
      if (i === 0) {
        return true;
      }
      // checks if the filteredSnapshot object at index i has a key (atom or selector) found in the selected array. This would indicate that there was a change to that state/selector because filter is an array of objects containing differences between snapshots.
      if (filterData[i]) {
        for (let key in filterData[i].filteredSnapshot) {
          for (let j = 0; j < selected.length; j++) {
            if (key === selected[j].name) {
              return true;
            }
          }
        }
      }
      return false;
    };
    const x: boolean = filterFunc();
    
    if (x === false) {
      continue;
    }
    
    // renderTime is set equal to the actualDuration. If i is zero then we are obtaining actualDuration from the very first snapshot in snapshotHistory. This is to avoid having undefined filter elements since there will be no difference between snapshot at the first instance. 
    let renderTime: number;
    if(i === 0) {
      renderTime = snapshotHistory[0].componentAtomTree.treeBaseDuration;
    } 
    //Checks to see if the actualDuration within filter is an array. If it is an array then the 2nd value in the array is the new actualDuration.
    else if (Array.isArray(filterData[i].componentAtomTree.actualDuration)) {      
      renderTime = (filterData[i].componentAtomTree.treeBaseDuration as number[])[1];
    } else {
      renderTime = filterData[i].componentAtomTree.treeBaseDuration as number;
    }

    // Push a div container to snapshotDivs array only if there was a change to state. 
    // The div container will contain renderTimes evaluated above.
    snapshotDivs.push(
      <div
        id={`snapshot${i}`}
        className="individualSnapshot"
        key={i}
        style={
          renderIndex === i
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        onClick={() => {
          setRenderIndex(i);
        }}>
        {/* <li>{i}</li> */}
        <li>{`${Math.round(renderTime*100)/100}ms`}</li>
        <button
          className="timeTravelButton"
          style={
          renderIndex === i
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {}
          }
          onClick={() => {
            timeTravelFunc(i);
          }}>
          Jump
        </button>
      </div>,
    );
  }

  //indexDiff is used to ensure the index of filter matches the index of the snapshots array in the backend
  let indexDiff: number = 0;
  if (filterData[0] && filterData[0].indexDiff) {
    indexDiff = filterData[0].indexDiff;
  }

  // functionality to postMessage the selected snapshot index to background.js
  const timeTravelFunc = (index: number) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    //const test = chrome.extension.getBackgroundPage();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {
        snapshotIndex: index + indexDiff,
      },
    });
  };

  function prevClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot')
    for (let i = 0; i < snapshotListArr.length; i++) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);
      
      if (index < renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i])
      }
      else break;
    }
  }

  function fwrdClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot')

    for (let i = snapshotListArr.length - 1; i >= 0; i--) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);
      
      if (index > renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i])
      }
      else break;
    }
  }

  return (
    <div className="SnapshotsContainer">
      <div id='clear-snapshots-title'>Clear Snapshots</div>
      <div className="clear-buttons">
      <button onClick={prevClr} id='prevClr'>Previous</button>
      <button onClick={fwrdClr} id='fwrdClr'>Forward</button>
      </div>
      <span
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
        Snapshots
      </span>
      <div className="SnapshotsList">
        <div>{snapshotDivs}</div>
        <div ref={snapshotEndRef} />
      </div>
    </div>
  );
};

export default SnapshotsContainer;
