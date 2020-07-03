import React from "react";
import JSONTree from 'react-json-tree';

const Tree = ({ curSnap }) => {
  // render json tree while passing in curSnap as data to JSONTree
  return (
    <div className="Tree">
      {curSnap && (
        <JSONTree
          data={curSnap}
          theme={{ tree: () => ({ className: "json-tree" }) }}
          shouldExpandNode={() => true}
          labelRenderer={(raw) =>
            typeof raw[0] !== "number" ? <span>{raw[0]}</span> : null
          }
        />
      )}
    </div>
  );
};

export default Tree;
