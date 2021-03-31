import React from 'react';
import JSONTree from 'react-json-tree';
import {useAppSelector} from '../../state-management/hooks';

const Tree: React.FC = () => {
  // render json tree while passing in newSnap as data to JSONTree
  //Retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const filteredCurSnap = snapshotHistory[snapshotHistory.length - 1].filteredSnapshot;
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
