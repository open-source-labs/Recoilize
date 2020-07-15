import React from 'react';
import Test from './Test.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>hello</h1>
      <Test />
    </div>
  );
};

export default App;
