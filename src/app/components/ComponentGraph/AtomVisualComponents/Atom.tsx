import React from 'react';

interface PropsInterface {
  i: number;
  atom: string;
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDropDownItem: React.Dispatch<React.SetStateAction<boolean>>
}

// when the ATOM button is clicked, it will render these 'Atom' buttons, which can be clicked to highlight the atoms on the component graph
const Atom = (props: PropsInterface) => {
  const {i, atom, setSelectedRecoilValue, setIsDropDownItem} = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !(event.target as HTMLInputElement).classList.contains('atomSelected') &&
      (event.target as HTMLInputElement).classList.contains('atomNotSelected')
    ) {
      (event.target as HTMLInputElement).classList.replace(
        'atomNotSelected',
        'atomSelected',
      );
    } else if (
      !(event.target as HTMLInputElement).classList.contains('atomSelected') &&
      !(event.target as HTMLInputElement).classList.contains('atomNotSelected')
    ) {
      (event.target as HTMLInputElement).classList.add('atomSelected');
    }

    document.querySelectorAll('.atom-class').forEach(item => {
      if (
        item.id !== `atom-drop${i}` &&
        item.classList.contains('atomSelected')
      ) {
        item.classList.replace('atomSelected', 'atomNotSelected');
      } else if (
        item.id !== `atom-drop${i}` &&
        !item.classList.contains('atomNotSelected')
      ) {
        item.classList.add('atomNotSelected');
      }
    });

    setSelectedRecoilValue([atom, 'atom']);
    setIsDropDownItem(true);
  };

  return (
    <div className="dropDownButtonDiv">
      <button
        id={`atom-drop${i}`}
        className="atom-class atomDropDown"
        key={i}
        onClick={handleClick}
      >
        {atom}
      </button>
    </div>
  );
};

export default Atom;
