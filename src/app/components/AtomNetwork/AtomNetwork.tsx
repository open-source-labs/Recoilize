import React from 'react';
import AtomNetworkLegend from './AtomNetworkLegend';
import AtomNetworkVisual from './AtomNetworkVisual';

//Create the container passing in the JSX props for each individual component
const AtomNetwork: React.FC = () => {
  return (
    <div className="networkContainer">
      <AtomNetworkVisual />
      <AtomNetworkLegend />
    </div>
  );
};

export default AtomNetwork;
