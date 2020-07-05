import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';
import {makeRelationshipLinks} from '../../utils/makeRelationshipLinks';

interface NetworkProps {
  newSnap: object;
}

const Network: React.FC<NetworkProps> = ({newSnap}) => {

  return (
    <div className="networkContainer">
      <div className="Network">
        <svg id="networkCanvas"></svg>
      </div>
    </div>
  );
};

export default Network;
