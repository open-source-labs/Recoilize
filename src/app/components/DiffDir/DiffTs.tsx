// renders the difference between the most recent state change and the previous
import React, { useState } from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const Diff = ({ oldSnap, newSnap }) => {
  // useState hook to update the toggle of showUnchanged or hideUnchanged
  const [rawToggle, setRawToggle] = useState(false);
  // diffing between oldSnap && newSnap
  const delta = diff(oldSnap, newSnap);
  // string of html with comparisons
  const html = formatters.html.format(delta, oldSnap);
  // conditionally render changes or not based on rawToggle bool
  rawToggle ? formatters.html.showUnchanged() : formatters.html.hideUnchanged();

  return (
    <div className='Diff'>
      <div className='toggleDiv'>
        <button
          className='rawToggle'
          style={{ 'color': rawToggle ? '#E6E6E6' : '#989898' }}
          onClick={() => {
            setRawToggle(!rawToggle);
          }}
        >
          Raw
        </button>
      </div>
      {ReactHtmlParser(html)}
    </div>
  );
};

Diff.propTypes = {
  // snapshot at index [curRender -1]
  oldSnap: PropTypes.object.isRequired,
  // snapshot at index [curRender]
  newSnap: PropTypes.object.isRequired,
};

export default Diff;
