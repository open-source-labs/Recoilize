import React from 'react';

const NavBar = ({ setTab, tabsList, tab }) => {
  // array of buttons with setTab functionality
  const renderedTabButtons = tabsList.reduce((acc, el) => {
    acc.push(
      <button
        className='navBarButtons'
        style={(tab === el) ? {'color': '#E6E6E6', 'backgroundColor': '#212121'} : {'color': '#989898'}}
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
