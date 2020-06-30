import React from "react";
import SnapshotsList from "../components/SnapshotsList";

const SnapshotsContainer = ({ snapshots, setCurRender }) => {
  return (
    <div className="SnapshotsContainer">
      <h3>Snapshots</h3>
      <SnapshotsList
        // array of snapshots
        snapshots={snapshots}
        // setState functionality to update curRender
        setCurRender={setCurRender}
      />
    </div>
  );
};

export default SnapshotsContainer;
