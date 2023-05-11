import React, {useState} from 'react';
import Atom from './Atom';
import Selector from './Selector';

interface PropsInterface {
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<string[]>>;
  atomList: string[];
  hasSuspense: boolean;
  selectorList: string[];
}

// NOTE: both button does not currently do anything
const AtomNetworkVisualLegend = (props: PropsInterface) => {

  const {setSelectedRecoilValue, atomList, hasSuspense, selectorList} = props;

  // hook for selected button styles on the legend
  const [atomButtonClicked, setAtomButtonClicked] = useState<boolean>(false);
  const [selectorButtonClicked, setSelectorButtonClicked] =
    useState<boolean>(false);

  // hook for toggling
  const [showAtomMenu, setShowAtomMenu] = useState<boolean>(false);
  const [showSelectorMenu, setShowSelectorMenu] = useState<boolean>(false);

  const [isDropDownItem, setIsDropDownItem] = useState<boolean>(false);

  // setting the component's user interface state by checking if the dropdown menu is open or not
  function openDropdown(e: React.MouseEvent) {
    const target = e.target as Element;
    // the button element with id 'AtomP'
    if (target.id === 'AtomP') {
      setAtomButtonClicked(true);
      setSelectorButtonClicked(false);
      setShowAtomMenu(!showAtomMenu);
      setShowSelectorMenu(false);
    } else {
      setAtomButtonClicked(false);
      setSelectorButtonClicked(true);
      setShowSelectorMenu(!showSelectorMenu);
      setShowAtomMenu(false);
    }
  }

  // resetting the component's user interface state when toggling between atoms & selectors
  const resetNodes = () => {
    setIsDropDownItem(false);
    setSelectedRecoilValue([]);
    setShowSelectorMenu(false);
    setShowAtomMenu(false);
    setAtomButtonClicked(false);
    setSelectorButtonClicked(false);
  };

  return (
    <div className="AtomNetworkLegend">
      <div className="AtomLegend" />
      <button
        onClick={isDropDownItem ? resetNodes : openDropdown}
        id="AtomP"
        className={
          atomButtonClicked ? 'AtomP atomSelected' : 'AtomP atomLegendDefault'
        }
      >
        ATOM
      </button>
      {showAtomMenu && (
        <div id="atomDrop" className="AtomDropDown">
          {atomList.map((atom, i) => (
            <Atom
              i={i}
              atom={atom}
              key={i}
              setSelectedRecoilValue={setSelectedRecoilValue}
              setIsDropDownItem={setIsDropDownItem}
            />
          ))}
        </div>
      )}
      <div className="SelectorLegend"></div>
      <button
        onClick={isDropDownItem ? resetNodes : openDropdown}
        id="SelectorP"
        className={
          selectorButtonClicked
            ? 'SelectorP selectorSelected'
            : 'SelectorP selectorLegendDefault'
        }
      >
        SELECTOR
      </button>
      {showSelectorMenu && (
        <div id="selectorDrop" className="SelectorDropDown">
          {selectorList.map((selector, i) => (
            <Selector
              i={i}
              selector={selector}
              setSelectedRecoilValue={setSelectedRecoilValue}
              setIsDropDownItem={setIsDropDownItem}
            />
          ))}
        </div>
      )}
      <div className="bothLegend"></div>
      <button className="bothLegendDefault">BOTH</button>
      <div className={hasSuspense ? 'suspenseLegend' : ''}></div>
      <p>{hasSuspense ? 'SUSPENSE' : ''}</p>
      <div className="tooltipContainer"></div>
    </div>
  );
};

export default AtomNetworkVisualLegend;
