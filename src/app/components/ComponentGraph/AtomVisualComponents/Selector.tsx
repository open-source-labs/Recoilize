import React from 'react';

interface PropsInterface {
  i: number;
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<string[]>>;
  selector: string;
  setIsDropDownItem: React.Dispatch<React.SetStateAction<boolean>>;
}

// this component renders a single selector button, which can be clicked to display the list of selectors
// once the button is clicked, it remains highlighted (currently stays the color yellow) unless ATOM is clicked. would consider adjusting this for better UI (5.2023)
const Selector = (props: PropsInterface) => {
  const {i, setSelectedRecoilValue, selector, setIsDropDownItem} = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !(event.target as HTMLInputElement).classList.contains(
        'selectorSelected',
      ) &&
      (event.target as HTMLInputElement).classList.contains(
        'selectorNotSelected',
      )
    ) {
      (event.target as HTMLInputElement).classList.replace(
        'selectorNotSelected',
        'selectorSelected',
      );
    } else if (
      !(event.target as HTMLInputElement).classList.contains(
        'selectorSelected',
      ) &&
      !(event.target as HTMLInputElement).classList.contains(
        'selectorNotSelected',
      )
    ) {
      (event.target as HTMLInputElement).classList.add('selectorSelected');
    }

    document.querySelectorAll('.selector-class').forEach(item => {
      if (
        item.id !== `selector-drop${i}` &&
        item.classList.contains('selectorSelected')
      ) {
        item.classList.replace('selectorSelected', 'selectorNotSelected');
      } else if (
        item.id !== `selector-drop${i}` &&
        !item.classList.contains('selectorNotSelected')
      ) {
        item.classList.add('selectorNotSelected');
      }
    });
    setSelectedRecoilValue([selector, 'selector']);
    setIsDropDownItem(true);
  };

  return (
    <div className="dropDownButtonDiv">
      <button
        id={`selector-drop${i}`}
        className="selector-class selectorDropDown"
        key={i}
        onClick={handleClick}
      >
        {selector}
      </button>
    </div>
  );
};

export default Selector;
