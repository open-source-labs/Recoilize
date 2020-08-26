import React from 'react';
import JSONTree from 'react-json-tree';
import {filteredSnapshot} from '../../../types';

interface TreeProps {
  // snapshot at index [curRender]
  filteredCurSnap: filteredSnapshot;
}

const Tree: React.FC<TreeProps> = ({filteredCurSnap}) => {
  // render json tree while passing in newSnap as data to JSONTree
  return (
    <div className="Tree">
      {filteredCurSnap && (
        <JSONTree
          data={filteredCurSnap}
          theme={{tree: () => ({className: 'json-tree'})}}
          shouldExpandNode={() => true}
          labelRenderer={raw =>
            typeof raw[0] !== 'number' ? (
              <span style={{fontSize: '14px'}}>{raw[0]}</span>
            ) : null
          }
        />
      )}
    </div>
  );
};

export default Tree;
