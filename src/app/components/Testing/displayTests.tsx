import React, {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

const DisplayTests: React.FC = () => {
  return (
    <div>
      <p>Expect current atom through selector to equal [expected] [params]</p>
    </div>
  );
};

export default DisplayTests;
