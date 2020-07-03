import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ setTab, tabsList, tab }) => {
  // array of buttons with setTab functionality
  const renderedTabButtons = tabsList.reduce((acc, tabName) => {
    acc.push(
      <button
        className='navBarButtons'
        key={tabName}
        style={
          tab === tabName
            ? { color: '#E6E6E6', backgroundColor: '#212121' }
            : { color: '#989898' }
        }
        onClick={() => {
          setTab(tabName);
        }}
      >
        {tabName}
      </button>
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className='NavBar'>{renderedTabButtons}</div>;
};

NavBar.propTypes = {
  // setState functionality to update tab
  setTab: PropTypes.func.isRequired,
  // array of object keys of conditional render object
  tabsList: PropTypes.arrayOf(PropTypes.string),
  // string of the current tab selected/rendered/displayed
  tab: PropTypes.string,
};

export default NavBar;
