import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state-management/hooks';
import { setSearchValue } from '../../state-management/slices/AtomNetworkSlice';

const AtomNetworkLegend: React.FC = () => {
  const dispatch = useAppDispatch();

  //Retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const filteredCurSnap =
  snapshotHistory[renderIndex].filteredSnapshot;

  // an array of atoms and selector sub
  const atomAndSelectorArr = Object.entries(filteredCurSnap);
  
  // array of atom names (what the drop down showAtomMenu is going to display)
  const [atomList] = useState(atomAndSelectorArr.filter(([isAtom, obj]: [string, any])=> !obj.nodeDeps.length ? isAtom : null));

  // array of selectors (what the drop down showSelectorMenu is going to display)
  const [selectorList] = useState(atomAndSelectorArr.filter(([isSelector, obj]:[string, any]) => obj.nodeDeps.length ? isSelector : null));

  //state hook for showing list of atoms
  const [showAtomMenu, setShowAtomMenu] = useState(false);
    
  //state hook for showing list of selectors
  const [showSelectorMenu, setShowSelectorMenu] = useState(false);
  const [atomButtonClicked, setAtomButtonClicked] = useState<boolean>(false);
  const [selectorButtonClicked, setSelectorButtonClicked] = useState<boolean>(false);

  // function to handle change in search bar. Sets searchValue state
  const handleChange = (e: any) => {
    dispatch(setSearchValue(e.target.value));
  };

  // handles clicking on Selector and Atom buttom to bring down
  // list of atoms or selects
  function openDropdown(e: React.MouseEvent) {
    const target = e.target as Element;

    // if user clicks on atom list button
    if(target.id === 'AtomP') {
      // check if selector list was previously open, if it is, close it
      if(showSelectorMenu) setShowSelectorMenu(false);

      // open atom list
      setShowAtomMenu(!showAtomMenu);
      // empty search box
      dispatch(setSearchValue(''));
      setAtomButtonClicked(true);
      setSelectorButtonClicked(false);
    }
    // if user clicks on selector list button
    else if(target.id === 'SelectorP') {
      // check if atom list was previously open, if it is, close it
      if(showAtomMenu) setShowAtomMenu(false);
      // show Selector list
      setShowSelectorMenu(!showSelectorMenu);
      // empty search box
      dispatch(setSearchValue(''));
      setSelectorButtonClicked(true);
      setAtomButtonClicked(false);
    };
  };

  // this probably needs to be refactored and split up into different files... too much code to digest in one single file (5.2023)
  return (

    <div className="LegendContainer">
      <div className= "RecoilSearch"> 
        <input
          id="networkSearch"
          type="text"
          placeholder="search for state"
          //check the input value to render corresponding and related nodes
          onChange={handleChange}
        />
      </div>

      {/* possible location for new file/ container named 'AtomNetworkLegendWithSearch - this could honestly be broken up even further as well */}
      <div className="AtomNetworkLegendWithSearch">
        <div className="AtomLegend"> </div> 
        {/* //change the visibility of the div depending the value of the state */}
        <button
          onClick={openDropdown}
          id="AtomP"
          className={
            atomButtonClicked ? "AtomP atomSelected" : "AtomP atomLegendDefault"
        }>
          ATOM
        </button>

        <div className="SelectorLegend"></div> 
        <button
          onClick={openDropdown}
          id="SelectorP"
          className={
            selectorButtonClicked ? "SelctorP selectorSelected" : "SelectorP selectorLegendDefault"
        }>
          SELECTOR
        </button>
              

        {/* conditional rendering of dropdowns depending on the value of the state */}
        {showAtomMenu &&
          <div className="AtomDropdown">
            {/* possible location for new file/ container named 'AtomDropdown' (5.2023) */}
            {atomList.map(([atom, atomObj], i)=> {
              return (
                <div className= "dropDownButtonDiv">
                  {/* would consider putting the onClick function of this button in a separate file (5.2023) */}
                  <button key={i} id={`atom-drop${i}`} className='atom-class atomDropDown' onClick={(event: React.MouseEvent) => {
                    if (
                      !(event.target as HTMLInputElement).classList.contains('atomSelected') &&
                      (event.target as HTMLInputElement).classList.contains('atomNotSelected')
                    ) {
                      (event.target as HTMLInputElement).classList.replace(
                        'atomNotSelected',
                        'atomSelected',
                      );
                    }else if (
                      !(event.target as HTMLInputElement).classList.contains('atomSelected') &&
                      !(event.target as HTMLInputElement).classList.contains('atomNotSelected')
                    ) {
                      (event.target as HTMLInputElement).classList.add('atomSelected');
                    };
    
                    document.querySelectorAll('.atom-class').forEach(item => {
                      if (
                        item.id !== `atom-drop${i}` &&
                        item.classList.contains('atomSelected')
                      ) {
                        item.classList.replace('atomSelected', 'atomNotSelected');
                      }else if (
                        item.id !== `atom-drop${i}` &&
                        !item.classList.contains('atomNotSelected')
                      ) {
                        item.classList.add('atomNotSelected');
                      }
                    });

                    //set the search value to the name of the paragraph element to render only corresponding and related nodes
                    dispatch(setSearchValue((event.target as Element).innerHTML));
                  }}>
                    {atom}
                  </button>
                </div>
              )

            })}
          </div>
        }
          
        {showSelectorMenu &&
          <div className="SelectorDropdown">
            {selectorList.map(([selector, selectorObj], i) => {
              {/* possible location for new file/ container named 'AtomDropdown' (5.2023) */}
              return (
                <div className="dropDownButtonDiv">
                  {/* would consider putting the onClick function of this button in a separate file (5.2023) */}
                  <button key={i} id={`selector-drop${i}`} className='selector-class selectorDropDown' onClick={(event: React.MouseEvent) => {
                    if (
                      !(event.target as HTMLInputElement).classList.contains('selectorSelected') &&
                      (event.target as HTMLInputElement).classList.contains('selectorNotSelected')
                    ) {
                        (event.target as HTMLInputElement).classList.replace(
                          'selectorNotSelected',
                          'selectorSelected',
                        );
                    }else if (
                      !(event.target as HTMLInputElement).classList.contains('selectorSelected') &&
                      !(event.target as HTMLInputElement).classList.contains('selectorNotSelected')
                    ) {
                      (event.target as HTMLInputElement).classList.add('selectorSelected');
                    };
    
                    document.querySelectorAll('.selector-class').forEach(item => {
                      if (
                        item.id !== `selector-drop${i}` &&
                        item.classList.contains('selectorSelected')
                      ) {
                        item.classList.replace('selectorSelected', 'selectorNotSelected');
                      }else if (
                        item.id !== `selector-drop${i}` &&
                        !item.classList.contains('selectorNotSelected')
                      ) {
                        item.classList.add('selectorNotSelected');
                      }
                    });
                      
                    //set the search value to the name of the paragraph element to render only corresponding and related nodes
                    dispatch(setSearchValue((event.target as Element).innerHTML));
                  }}>
                    {selector}
                  </button>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default AtomNetworkLegend; 