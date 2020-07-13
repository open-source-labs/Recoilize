import React from 'react';

interface NavBarProps {
  // setState functionality to update tab
  setTab: React.Dispatch<React.SetStateAction<string>>;
  // array of object keys of conditional render object
  tabsList: string[];
  // string of the current tab selected/rendered/displayed
  tab: string;
}

const NavBar: React.FC<NavBarProps> = ({setTab, tabsList, tab}) => {
  // array of buttons with setTab functionality
  const renderedTabButtons = tabsList.reduce<JSX.Element[]>((acc, tabName) => {
    acc.push(
      <button
        className="navBarButtons"
        key={tabName}
        style={
          tab === tabName
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        onClick={() => {
          setTab(tabName);
        }}>
        {tabName}
      </button>,
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className="NavBar">{renderedTabButtons}</div>;
};

export default NavBar;
