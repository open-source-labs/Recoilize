import React from 'react';
import JSONTree from 'react-json-tree';
import { filteredSnapshot } from '../../../types';

interface TreeProps {
  // snapshot at index [curRender]
  newSnap: filteredSnapshot;
}

const Tree: React.FC<TreeProps> = ({ newSnap }) => {
  // render json tree while passing in newSnap as data to JSONTree
  return (
    <div className="Tree">
      {newSnap && (
        <JSONTree
          data={newSnap}
          theme={{ tree: () => ({ className: 'json-tree' }) }}
          shouldExpandNode={() => true}
          labelRenderer={raw =>
            typeof raw[0] !== 'number' ? <span>{raw[0]}</span> : null
          }
        />
      )}
    </div>
  );
};

export default Tree;
