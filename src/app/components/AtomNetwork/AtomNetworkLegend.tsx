import React, {useState} from 'react';

interface AtomLegend {
    // filteredCurSnap is an object of atom or selector names as keys and 
    // an object as their value.
    atomAndSelectorArr: [string, any][];
    setSearchValue: any;
  };

const AtomNetworkLegend: React.FC<AtomLegend> = ({atomAndSelectorArr, setSearchValue}) => {

    // array of atom names (what the drop down showAtomMenu is going to display)
    const [atomList] = useState(atomAndSelectorArr.filter(([isAtom, obj])=> !obj.nodeDeps.length ? isAtom : null));
    
    // array of selectors (what the drop down showSelectorMenu is going to display)
    const [selectorList] = useState(atomAndSelectorArr.filter(([isSelector, obj]) => obj.nodeDeps.length ? isSelector : null));


    //state hook for showing list of atoms
    const [showAtomMenu, setShowAtomMenu] = useState(false);
    
    //state hook for showing list of selectors
    const [showSelectorMenu, setShowSelectorMenu] = useState(false);

    // function to handle change in search bar. Sets searchValue state
     const handleChange = (e: any) => {
        setSearchValue(e.target.value);
     };

    // handles clicking on Selector and Atom buttom to bring down
    // list of atoms or selects
    function openDropdown(e: React.MouseEvent) {
        // if user clicks on atom list button
        const target = e.target as Element;
        if(target.className === 'AtomP') {
        // check if selector list was previously open, if it is, close it
        if(showSelectorMenu) setShowSelectorMenu(false);
        // open atom list
        setShowAtomMenu(!showAtomMenu);
        // empty search box
        setSearchValue('');
        }
        // if user clicks on selector list button
        else if(target.className === 'SelectorP') {
        // check if atom list was previously open, if it is, close it
        if(showAtomMenu) setShowAtomMenu(false);
        // show Selector list
        setShowSelectorMenu(!showSelectorMenu);
        // empty search box
        setSearchValue('');
        }
    }

    return (

        <div className="LegendContainer">
            <div className="AtomNetworkLegend">
            <input
                id="networkSearch"
                type="text"
                placeholder="search for state"
                //check the input value to render corresponding and related nodes
                onChange={handleChange}
            />
            <div className="AtomDiv" 
                //change the visibility of the div depending the value of the state
                style={showSelectorMenu ? {opacity: '30%'} : {opacity: '100%'}} 
                onClick={openDropdown}>
                <div className="AtomLegend" />
                <p className="AtomP">ATOM</p>
            </div>

            <div className="SelectorDiv"
                //change the visibility of the div depending the value of the state
                style={showAtomMenu ? {opacity: '30%'} : {opacity: '100%'}} 
                onClick={openDropdown}>
                <div className="SelectorLegend"></div>
                <p className="SelectorP">SELECTOR</p>
            </div> 

            {/* conditional rendering of dropdowns depending on the value of the state */}
            {showAtomMenu &&
                <div className="AtomDropdown">{atomList.map(([atom, atomObj], i)=> {
                return (<p key={i} id={`Atom${i}`} className='AtomListItem' style={{opacity: '30%'}} onClick={(e: React.MouseEvent) => {
                    //set the opacity to 30%, unless spefic element is clicked then changes it to 100%
                    document.querySelector(`#Atom${i}`).setAttribute('style', 'opacity: 100%;');
                    document.querySelectorAll('.AtomListItem').forEach(item => {
                    if(item.id !== `Atom${i}`) item.setAttribute('style', 'opacity: 30%;')
                    });
                    //set the search value to the name of the paragraph element to render only corresponding and related nodes
                    setSearchValue((e.target as Element).innerHTML);
                }}>{atom}</p>)
            })}</div>}
            {showSelectorMenu &&
                <div className="SelectorDropdown">{selectorList.map(([selector, selectorObj], i) => {
                return (<p key={i} id={`Selector${i}`} className='SelectorListItem' style={{opacity: '30%'}} onClick={(e: React.MouseEvent) => {
                    //set the opacity to 30%, unless specific element is clicked then changes it to 100%
                    document.querySelector(`#Selector${i}`).setAttribute('style', 'opacity: 100%;');
                    document.querySelectorAll('.SelectorListItem').forEach(item => {
                    if(item.id !== `Selector${i}`) item.setAttribute('style', 'opacity: 30%;')
                    });
                    //set the search value to the name of the paragraph element to render only corresponding and related nodes
                    setSearchValue((e.target as Element).innerHTML);
                }}>{selector}</p>)
            })}</div>}
            </div>
        </div>
    )
}

export default AtomNetworkLegend; 