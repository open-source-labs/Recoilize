// renders the difference between the most recent state change and the previous
import React, { useState } from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';

const Diff = ({ oldSnap, newSnap }) => {
  //
  const [rawToggle, setRawToggle] = useState(false);
  // diffing between oldSnap && newSnap
  const delta = diff(oldSnap, newSnap);
  // string of html with comparisons
  const html = formatters.html.format(delta, oldSnap);
  // conditionally render changes or not
  rawToggle ? formatters.html.showUnchanged() : formatters.html.hideUnchanged();

  return (
    <div className='Diff'>
      <button
        onClick={() => {
          setRawToggle(!rawToggle);
        }}
      >
        Toggle Raw
      </button>
      {ReactHtmlParser(html)}
    </div>
  );
};

export default Diff;
