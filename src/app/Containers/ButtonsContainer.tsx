import React from 'react';

const ButtonsContainer = () => {
  const howToUseHandler = () => {
    window.open('https://github.com/open-source-labs/Recoilize', '_blank');
  };
  return (
    <div className="buttons_container">
      <button
        id="docs_button"
        type="button"
        onClick={() => {
          howToUseHandler();
        }}>
        How To Use
      </button>
    </div>
  );
};

export default ButtonsContainer;
