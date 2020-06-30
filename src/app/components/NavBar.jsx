import React from 'react';

const NavBar = ({tab, setTab, tabsList}) => {
  // array of buttons with setTab functionality
  const renderedTabButtons = tabsList.reduce((acc, el) => {
    acc.push(
      <button
        key={el}
        className="navBarButtons"
        onClick={() => {
          setTab(el);
        }}>
        {el}
      </button>,
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className="NavBar">{renderedTabButtons}</div>;
};

export default NavBar;
