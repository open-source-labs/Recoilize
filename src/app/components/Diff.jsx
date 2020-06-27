// renders the difference between the most recent state change and the previous
import React from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';

const Diff = ({ oldSnap, newSnap }) => {
  // diffing between oldSnap && newSnap
  const delta = diff(oldSnap, newSnap);
  // string of html with comparisons
  const html = formatters.html.format(delta, oldSnap);

  return <div className='Diff'>{ReactHtmlParser(html)}</div>;
};

export default Diff;
