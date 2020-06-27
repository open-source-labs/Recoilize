import React from 'react';

const NavBar = ({tab, setTab}) => {
  return (
    <div className="NavBar">
      <button
        className="navBarButtons"
        onClick={() => {
          setTab('diff');
        }}>
        Diff
      </button>
      <button
        className="navBarButtons"
        onClick={() => {
          setTab('atoms');
        }}>
        Atoms
      </button>
    </div>
  );
};

export default NavBar;
