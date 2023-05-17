// testing needs to be created for this container (5.2023)
import React from 'react';

const LOGO_URL = './assets//Recoilize-v2.png'; // -> this file is used in the chrome extension. directory is set up to retrieve image in extension folder

export const ModuleNotFoundContainer = () => {
  return (
    <div className="notFoundContainer">
      <img className="logo" src={LOGO_URL} />
      <p>
        Supported only with Recoil apps with the Recoilize NPM module.
        <br />
        Please follow the installation instructions at&nbsp;
        <a
          target="_blank"
          href="https://github.com/open-source-labs/Recoilize"
          rel="noreferrer">
          Recoilize
        </a>
      </p>
    </div>
  );
};