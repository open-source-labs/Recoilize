// renders a list of all of the snapshots that were taking
import React from 'react';
import PropTypes from 'prop-types';

const SnapshotsList = ({
  curRender,
  setCurRender,
  snapshotHistory,
  setSnapshotTimeTravelIndex,
}) => {
  // array of individual snapshots with setCurRender and timeTravel functionality
  const listOfSnapshots = snapshotHistory.reduce((acc, curSnap, i) => {
    acc.push(
      <div
        className='individualSnapshot'
        key={i}
        style={
          curRender === i
            ? { color: '#E6E6E6', backgroundColor: '#212121' }
            : { color: '#989898' }
        }
        onClick={() => {
          setCurRender(i);
        }}
      >
        <li>{i}</li>
        <button
          className='timeTravelButton'
          onClick={() => {
            setSnapshotTimeTravelIndex(i);
          }}
        >
          Time Travel
        </button>
      </div>
    );
    return acc;
  }, []);
  // render the array of snapshots divs generated above
  return <div className='SnapshotsList'>{listOfSnapshots}</div>;
};

SnapshotsList.propTypes = {
  // index of current snapshot rendered in devtool
  curRender: PropTypes.number.isRequired,
  // setState functionality to update curRender
  setCurRender: PropTypes.func.isRequired,
  // array of object snapshots of user's state
  snapshotHistory: PropTypes.arrayOf(PropTypes.object),
  // function will post message to background.js passing snapshots index in payload
  setSnapshotTimeTravelIndex: PropTypes.func.isRequired,
};

export default SnapshotsList;
