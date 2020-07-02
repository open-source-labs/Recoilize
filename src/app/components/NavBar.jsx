import React from 'react';

const NavBar = ({ setTab, tabsList }) => {
  // array of buttons with setTab functionality
  const renderedTabButtons = tabsList.reduce((acc, el) => {
    acc.push(
      <button
        className='navBarButtons'
        key={el}
        // setState functionality to update tab
        onClick={() => {
          setTab(el);
        }}
      >
        {el}
      </button>
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className='NavBar'>{renderedTabButtons}</div>;
};

export default NavBar;
